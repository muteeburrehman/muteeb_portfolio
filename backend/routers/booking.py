"""Booking API — availability slots, confirmations, funnel stats."""

from __future__ import annotations

import asyncio
import logging
import os
from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, Query

from schemas.booking import (
    BookingCancelRequest,
    BookingCancelResponse,
    BookingConfigResponse,
    BookingCreate,
    BookingCreateResponse,
    FunnelStatsResponse,
    SlotAvailabilitySummary,
    SlotsQueryResponse,
)
from services import booking_service
from services.availability_service import load_availability_rules
from services.booking_urls import booking_cancel_url
from services.booking_store import funnel_stats

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/booking", tags=["booking"])


@router.get("/config", response_model=BookingConfigResponse)
async def booking_config() -> BookingConfigResponse:
    return booking_service.get_booking_config()


@router.get("/slots", response_model=SlotsQueryResponse)
async def booking_slots(
    from_date: date = Query(..., alias="from", description="Start date (YYYY-MM-DD)"),
    to_date: date | None = Query(None, alias="to", description="End date (YYYY-MM-DD)"),
) -> SlotsQueryResponse:
    rules = load_availability_rules()
    end = to_date or from_date
    max_end = from_date + timedelta(days=rules.max_days_ahead)
    if end > max_end:
        end = max_end
    return booking_service.list_available_slots(from_date, end)


@router.get("/availability-summary", response_model=SlotAvailabilitySummary)
async def booking_availability_summary(
    from_date: date = Query(..., alias="from"),
    to_date: date | None = Query(None, alias="to"),
) -> SlotAvailabilitySummary:
    rules = load_availability_rules()
    end = to_date or from_date
    max_end = from_date + timedelta(days=rules.max_days_ahead)
    if end > max_end:
        end = max_end
    return booking_service.slot_availability_summary(from_date, end)


@router.get("/manage")
async def booking_manage_preview(
    token: str = Query(..., min_length=16),
) -> dict:
    try:
        record = await asyncio.to_thread(booking_service.preview_booking_by_token, token)
    except LookupError:
        raise HTTPException(status_code=404, detail="Booking not found") from None
    return {
        "booking_id": record.id,
        "name": record.name,
        "email": record.email,
        "starts_at": record.starts_at.isoformat(),
        "ends_at": record.ends_at.isoformat(),
        "status": record.status,
        "meeting_link": record.meeting_link if record.status == "confirmed" else None,
    }


@router.post("/cancel", response_model=BookingCancelResponse)
async def cancel_discovery_call(payload: BookingCancelRequest) -> BookingCancelResponse:
    try:
        record = await asyncio.to_thread(
            booking_service.cancel_booking,
            token=payload.token,
            booking_id=payload.booking_id,
            email=str(payload.email) if payload.email else None,
        )
    except LookupError:
        raise HTTPException(status_code=404, detail="Booking not found or email does not match") from None
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception:
        logger.exception("Booking cancel failed")
        raise HTTPException(status_code=503, detail="Could not cancel booking.") from None

    return BookingCancelResponse(
        detail="Booking cancelled. That time slot is open again for others.",
        freed_slot=record.starts_at,
    )


@router.post("/", response_model=BookingCreateResponse)
async def book_discovery_call(payload: BookingCreate) -> BookingCreateResponse:
    try:
        record = await asyncio.to_thread(booking_service.create_booking, payload)
    except ValueError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except Exception:
        logger.exception("Booking creation failed")
        raise HTTPException(
            status_code=503,
            detail="Could not complete booking. Please try again or email us directly.",
        ) from None

    rules = load_availability_rules()
    return BookingCreateResponse(
        booking_id=record.id,
        start=record.starts_at,
        end=record.ends_at,
        timezone=str(rules.timezone),
        meeting_link=record.meeting_link,
        cancel_url=booking_cancel_url(record.cancel_token),
        detail="Discovery call booked successfully.",
    )


@router.get("/stats", response_model=FunnelStatsResponse)
async def booking_stats(key: str = Query(..., description="Admin key")) -> FunnelStatsResponse:
    expected = os.getenv("BOOKING_ADMIN_KEY", "").strip()
    if not expected or key != expected:
        raise HTTPException(status_code=403, detail="Forbidden")
    stats = funnel_stats()
    return FunnelStatsResponse(**stats)
