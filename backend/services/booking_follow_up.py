"""Background email and webhook work after booking create/cancel."""

from __future__ import annotations

import logging
import threading

from services.availability_service import load_availability_rules
from services.booking_email import send_booking_cancelled_email, send_booking_emails
from services.booking_store import get_booking
from services.funnel_webhook import notify_funnel_webhook

logger = logging.getLogger(__name__)


def _run_booking_created(booking_id: str) -> None:
    record = get_booking(booking_id)
    if not record or record.status != "confirmed":
        return

    rules = load_availability_rules()
    tz = str(rules.timezone)

    try:
        send_booking_emails(record, tz)
    except Exception:
        logger.exception("Booking emails failed for %s", booking_id)

    notify_funnel_webhook(record)


def _run_booking_cancelled(booking_id: str) -> None:
    record = get_booking(booking_id)
    if not record:
        return

    rules = load_availability_rules()
    try:
        send_booking_cancelled_email(record, str(rules.timezone))
    except Exception:
        logger.exception("Cancel emails failed for %s", booking_id)


def schedule_booking_created(booking_id: str) -> None:
    threading.Thread(target=_run_booking_created, args=(booking_id,), daemon=True).start()


def schedule_booking_cancelled(booking_id: str) -> None:
    threading.Thread(target=_run_booking_cancelled, args=(booking_id,), daemon=True).start()
