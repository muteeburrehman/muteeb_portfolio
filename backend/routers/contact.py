"""POST /contact — validates payload and sends branded notification email."""

from __future__ import annotations

import asyncio
import logging

from fastapi import APIRouter, HTTPException

from schemas.contact import ContactSubmission
from services.contact_follow_up import schedule_contact_emails
from services.contact_store import insert_contact

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])


@router.post("/contact", summary="Receive contact form and send email.")
async def submit_contact(payload: ContactSubmission) -> dict[str, bool | str]:
    try:
        await asyncio.to_thread(insert_contact, payload)
    except Exception:
        logger.exception("Contact DB save failed for <%s>", payload.email)
        raise HTTPException(
            status_code=503,
            detail=(
                "We could not save your message. Please try again shortly or "
                "email us directly."
            ),
        ) from None

    schedule_contact_emails(payload)
    logger.info("Contact saved for <%s>; emails queued", payload.email)
    return {"ok": True, "detail": "Message sent successfully"}
