"""Internal admin API — contacts, bookings, export (super-user only)."""

from __future__ import annotations

import asyncio
import csv
import io
import logging
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from fastapi.responses import StreamingResponse

from schemas.admin import (
    AdminAnalyticsDay,
    AdminBookingCancelResponse,
    AdminBookingItem,
    AdminBookingListResponse,
    AdminContactItem,
    AdminContactListResponse,
    AdminContactPatchResponse,
    AdminDeleteResponse,
    AdminOverviewResponse,
    AdminSendMessageRequest,
    AdminSendMessageResponse,
    AdminSessionResponse,
)
from services.admin_auth import verify_admin
from services.admin_message_service import send_admin_message
from services.email_service import smtp_delivery_detail
from services.booking_service import admin_cancel_booking, admin_delete_booking
from services.booking_store import booking_counts, list_bookings
from services.contact_store import contact_counts, delete_contact, list_contacts, mark_contact_replied
from services.funnel_analytics import funnel_daily_analytics

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin(
    x_admin_key: Annotated[str, Header(alias="X-Admin-Key")],
    x_admin_email: Annotated[str, Header(alias="X-Admin-Email")],
) -> str:
    if not verify_admin(email=x_admin_email, key=x_admin_key):
        raise HTTPException(status_code=403, detail="Forbidden")
    return x_admin_email.strip().lower()


def _contact_item(record) -> AdminContactItem:
    return AdminContactItem(
        id=record.id,
        name=record.name,
        email=record.email,
        message=record.message,
        topic=record.topic,
        service=record.service,
        company=record.company,
        phone=record.phone,
        created_at=record.created_at,
        replied_at=record.replied_at,
        replied=record.replied_at is not None,
    )


def _booking_item(record) -> AdminBookingItem:
    return AdminBookingItem(
        id=record.id,
        name=record.name,
        email=record.email,
        company=record.company,
        phone=record.phone,
        notes=record.notes,
        starts_at=record.starts_at,
        ends_at=record.ends_at,
        meeting_link=record.meeting_link,
        status=record.status,
        created_at=record.created_at,
    )


@router.get("/session", response_model=AdminSessionResponse)
async def admin_session(_email: Annotated[str, Depends(require_admin)]) -> AdminSessionResponse:
    return AdminSessionResponse(ok=True, email=_email)


@router.get("/overview", response_model=AdminOverviewResponse)
async def admin_overview(_email: Annotated[str, Depends(require_admin)]) -> AdminOverviewResponse:
    contacts = contact_counts()
    bookings = booking_counts()
    return AdminOverviewResponse(
        contacts_total=contacts["total"],
        contacts_pending=contacts["pending"],
        contacts_replied=contacts["replied"],
        bookings_confirmed=bookings["confirmed"],
        bookings_cancelled=bookings["cancelled"],
        bookings_upcoming=bookings["upcoming"],
        bookings_last_30_days=bookings["last_30_days"],
    )


@router.get("/contacts", response_model=AdminContactListResponse)
async def admin_contacts(
    _email: Annotated[str, Depends(require_admin)],
    status: str = Query("all", pattern="^(all|pending|replied)$"),
    limit: int = Query(500, ge=1, le=2000),
) -> AdminContactListResponse:
    records = list_contacts(status=status, limit=limit)
    return AdminContactListResponse(items=[_contact_item(r) for r in records])


@router.patch("/contacts/{contact_id}", response_model=AdminContactPatchResponse)
async def admin_mark_contact_replied(
    contact_id: str,
    _email: Annotated[str, Depends(require_admin)],
) -> AdminContactPatchResponse:
    record = mark_contact_replied(contact_id)
    if not record:
        raise HTTPException(status_code=404, detail="Contact not found")
    return AdminContactPatchResponse(ok=True, contact=_contact_item(record))


@router.get("/bookings", response_model=AdminBookingListResponse)
async def admin_bookings(
    _email: Annotated[str, Depends(require_admin)],
    status: str = Query("all", pattern="^(all|confirmed|cancelled)$"),
    limit: int = Query(500, ge=1, le=2000),
) -> AdminBookingListResponse:
    records = list_bookings(status=status, limit=limit)
    return AdminBookingListResponse(items=[_booking_item(r) for r in records])


@router.get("/analytics", response_model=AdminAnalyticsDay)
async def admin_analytics(
    _email: Annotated[str, Depends(require_admin)],
    days: int = Query(14, ge=7, le=30),
) -> AdminAnalyticsDay:
    data = funnel_daily_analytics(days=days)
    return AdminAnalyticsDay(**data)


@router.post("/bookings/{booking_id}/cancel", response_model=AdminBookingCancelResponse)
async def admin_cancel_discovery_call(
    booking_id: str,
    _email: Annotated[str, Depends(require_admin)],
) -> AdminBookingCancelResponse:
    try:
        record = await asyncio.to_thread(admin_cancel_booking, booking_id)
    except LookupError:
        raise HTTPException(status_code=404, detail="Booking not found") from None
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None
    except Exception:
        raise HTTPException(status_code=503, detail="Could not cancel booking.") from None

    return AdminBookingCancelResponse(
        ok=True,
        booking=_booking_item(record),
        detail="Booking cancelled. The client was emailed and the slot is open again.",
    )


@router.delete("/bookings/{booking_id}", response_model=AdminDeleteResponse)
async def admin_delete_discovery_call(
    booking_id: str,
    _email: Annotated[str, Depends(require_admin)],
) -> AdminDeleteResponse:
    try:
        await asyncio.to_thread(admin_delete_booking, booking_id)
    except LookupError:
        raise HTTPException(status_code=404, detail="Booking not found") from None
    except Exception:
        logger.exception("Admin booking delete failed for %s", booking_id)
        raise HTTPException(status_code=503, detail="Could not delete booking.") from None

    return AdminDeleteResponse(
        detail="Booking permanently deleted. The time slot is open again (no email sent).",
    )


@router.delete("/contacts/{contact_id}", response_model=AdminDeleteResponse)
async def admin_delete_contact(
    contact_id: str,
    _email: Annotated[str, Depends(require_admin)],
) -> AdminDeleteResponse:
    try:
        await asyncio.to_thread(delete_contact, contact_id)
    except LookupError:
        raise HTTPException(status_code=404, detail="Contact not found") from None
    except Exception:
        logger.exception("Admin contact delete failed for %s", contact_id)
        raise HTTPException(status_code=503, detail="Could not delete contact.") from None

    return AdminDeleteResponse(detail="Contact permanently deleted.")


@router.post("/messages", response_model=AdminSendMessageResponse)
async def admin_send_message(
    payload: AdminSendMessageRequest,
    _email: Annotated[str, Depends(require_admin)],
) -> AdminSendMessageResponse:
    try:
        await asyncio.to_thread(
            send_admin_message,
            to_email=str(payload.to_email),
            subject=payload.subject,
            message=payload.message,
            recipient_name=payload.recipient_name,
            contact_id=payload.contact_id,
        )
    except Exception as exc:
        logger.exception("Admin message send failed")
        raise HTTPException(
            status_code=503,
            detail=smtp_delivery_detail(exc),
        ) from exc

    return AdminSendMessageResponse(ok=True, detail="Message sent successfully.")


@router.get("/export/contacts.csv")
async def admin_export_contacts_csv(
    _email: Annotated[str, Depends(require_admin)],
    status: str = Query("all", pattern="^(all|pending|replied)$"),
) -> StreamingResponse:
    records = list_contacts(status=status, limit=2000)
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(
        [
            "id",
            "name",
            "email",
            "phone",
            "company",
            "topic",
            "service",
            "message",
            "created_at",
            "replied_at",
            "replied",
        ]
    )
    for row in records:
        writer.writerow(
            [
                row.id,
                row.name,
                row.email,
                row.phone or "",
                row.company or "",
                row.topic or row.service or "",
                row.service or "",
                row.message,
                row.created_at.isoformat(),
                row.replied_at.isoformat() if row.replied_at else "",
                "yes" if row.replied_at else "no",
            ]
        )

    filename = f"contacts-{status}-{datetime.utcnow().strftime('%Y%m%d')}.csv"
    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
