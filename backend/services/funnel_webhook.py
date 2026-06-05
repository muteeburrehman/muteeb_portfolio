"""POST booking payload to n8n (or any automation URL) for extended funnel flows."""

from __future__ import annotations

import logging
import os

import httpx

from services.booking_store import BookingRecord

logger = logging.getLogger(__name__)


def notify_funnel_webhook(booking: BookingRecord) -> None:
    url = (os.getenv("N8N_BOOKING_WEBHOOK_URL") or os.getenv("FUNNEL_WEBHOOK_URL") or "").strip()
    if not url:
        return

    payload = {
        "event": "booking.created",
        "booking_id": booking.id,
        "name": booking.name,
        "email": booking.email,
        "company": booking.company,
        "phone": booking.phone,
        "notes": booking.notes,
        "source": booking.source,
        "starts_at": booking.starts_at.isoformat(),
        "ends_at": booking.ends_at.isoformat(),
        "meeting_link": booking.meeting_link,
        "hubspot_contact_id": booking.hubspot_contact_id,
        "hubspot_deal_id": booking.hubspot_deal_id,
    }

    try:
        with httpx.Client(timeout=12.0) as client:
            resp = client.post(url, json=payload)
            resp.raise_for_status()
        logger.info("Funnel webhook delivered for booking %s", booking.id)
    except Exception:
        logger.exception("Funnel webhook failed for booking %s", booking.id)
