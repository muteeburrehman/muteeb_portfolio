"""POST /contact — validates payload and sends branded notification email."""

from __future__ import annotations

import asyncio
import logging

from fastapi import APIRouter, HTTPException

from schemas.contact import ContactSubmission
from services.contact_store import insert_contact
from services.email_service import process_contact_submission

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])


@router.post("/contact", summary="Receive contact form and send email.")
async def submit_contact(payload: ContactSubmission) -> dict[str, bool | str]:
    try:
        await asyncio.to_thread(process_contact_submission, payload)
    except Exception:
        logger.exception("Contact SMTP delivery failed")
        raise HTTPException(
            status_code=503,
            detail=(
                "We could not deliver your message. Please try again shortly or "
                "email us directly."
            ),
        ) from None

    try:
        await asyncio.to_thread(insert_contact, payload)
    except Exception:
        logger.exception("Contact DB save failed for <%s>", payload.email)

    logger.info("Contact email sent for <%s>", payload.email)
    return {"ok": True, "detail": "Message sent successfully"}
