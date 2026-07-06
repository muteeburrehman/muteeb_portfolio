"""Orchestrate slot validation, persistence, CRM, webhooks, and email."""

from __future__ import annotations

import logging
from datetime import date, datetime, timedelta

from schemas.booking import (
    BookingConfigResponse,
    BookingCreate,
    DaySlotCount,
    SlotAvailabilitySummary,
    SlotResponse,
    SlotsQueryResponse,
)
from services.availability_service import _day_key, format_slot_label, generate_slots, load_availability_rules
from services.booking_follow_up import schedule_booking_cancelled, schedule_booking_created
from services.booking_store import (
    BookingRecord,
    admin_cancel_booking as store_admin_cancel_booking,
    cancel_booking as store_cancel_booking,
    delete_booking,
    get_booking,
    get_booking_by_token,
    insert_booking,
    list_booked_ranges,
)
from services.hubspot_service import sync_booking_to_hubspot
from services.meeting_links import get_meeting_link

logger = logging.getLogger(__name__)


def get_booking_config() -> BookingConfigResponse:
    rules = load_availability_rules()
    _, provider = get_meeting_link()

    return BookingConfigResponse(
        timezone=str(rules.timezone),
        slot_duration_minutes=rules.slot_duration_minutes,
        min_notice_hours=rules.min_notice_hours,
        max_days_ahead=rules.max_days_ahead,
        meeting_provider=provider,
    )


def list_available_slots(from_date: date, to_date: date) -> SlotsQueryResponse:
    rules = load_availability_rules()
    if to_date < from_date:
        to_date = from_date

    range_start_dt = datetime.combine(from_date, datetime.min.time(), tzinfo=rules.timezone)
    range_end_dt = datetime.combine(to_date, datetime.max.time(), tzinfo=rules.timezone)

    booked = list_booked_ranges(range_start=range_start_dt, range_end=range_end_dt)
    pairs = generate_slots(rules, from_date, to_date, booked)

    slots = [
        SlotResponse(
            start=start,
            end=end,
            label=format_slot_label(start, rules),
        )
        for start, end in pairs
    ]

    return SlotsQueryResponse(timezone=str(rules.timezone), slots=slots)


def slot_availability_summary(from_date: date, to_date: date) -> SlotAvailabilitySummary:
    """How many open slots per day — for greying out fully booked days in the UI."""
    rules = load_availability_rules()
    range_start_dt = datetime.combine(from_date, datetime.min.time(), tzinfo=rules.timezone)
    range_end_dt = datetime.combine(to_date, datetime.max.time(), tzinfo=rules.timezone)
    booked = list_booked_ranges(range_start=range_start_dt, range_end=range_end_dt)

    days: list[DaySlotCount] = []
    day = from_date
    while day <= to_date:
        count = len(generate_slots(rules, day, day, booked))
        bookable = bool(rules.weekly_hours.get(_day_key(day), []))
        days.append(
            DaySlotCount(
                date=day.isoformat(),
                available_count=count,
                bookable=bookable,
            )
        )
        day += timedelta(days=1)

    return SlotAvailabilitySummary(timezone=str(rules.timezone), days=days)


def create_booking(payload: BookingCreate) -> BookingRecord:
    rules = load_availability_rules()
    start = payload.start
    if start.tzinfo is None:
        start = start.replace(tzinfo=rules.timezone)
    else:
        start = start.astimezone(rules.timezone)

    end = start + timedelta(minutes=rules.slot_duration_minutes)
    meeting_link, _ = get_meeting_link()

    contact_id, deal_id = None, None
    try:
        contact_id, deal_id = sync_booking_to_hubspot(
            name=payload.name,
            email=str(payload.email),
            company=payload.company,
            phone=payload.phone,
            notes=payload.notes,
            starts_at=start,
            meeting_link=meeting_link,
        )
    except Exception:
        logger.exception("HubSpot sync failed for <%s> — booking will still be saved", payload.email)

    try:
        record = insert_booking(
            name=payload.name,
            email=str(payload.email),
            company=payload.company,
            phone=payload.phone,
            notes=payload.notes,
            source=payload.source,
            starts_at=start,
            ends_at=end,
            meeting_link=meeting_link,
            hubspot_contact_id=contact_id,
            hubspot_deal_id=deal_id,
        )
    except ValueError:
        raise
    except Exception:
        logger.exception("Booking insert failed")
        raise ValueError("That time slot is no longer available. Please pick another.") from None

    schedule_booking_created(record.id)
    return record


def admin_cancel_booking(booking_id: str) -> BookingRecord:
    record = store_admin_cancel_booking(booking_id)
    schedule_booking_cancelled(record.id)
    return record


def admin_delete_booking(booking_id: str) -> None:
    delete_booking(booking_id)


def cancel_booking(
    *,
    token: str | None = None,
    booking_id: str | None = None,
    email: str | None = None,
) -> BookingRecord:
    record = store_cancel_booking(booking_id=booking_id, cancel_token=token, email=email)
    schedule_booking_cancelled(record.id)
    return record


def preview_booking_by_token(token: str) -> BookingRecord:
    record = get_booking_by_token(token)
    if not record:
        raise LookupError("Booking not found")
    return record


def require_booking(booking_id: str) -> BookingRecord:
    record = get_booking(booking_id)
    if not record:
        raise LookupError("Booking not found")
    return record
