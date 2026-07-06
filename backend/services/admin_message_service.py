"""Send branded custom messages from the admin dashboard."""

from __future__ import annotations

import logging
import os

from services.admin_message_html import render_admin_message_html
from services.contact_store import get_contact, mark_contact_replied
from services.email_service import send_raw_email

logger = logging.getLogger(__name__)
BRAND = os.getenv("MAIL_BRAND_NAME", "Muteeb Labs")


def send_admin_message(
    *,
    to_email: str,
    subject: str,
    message: str,
    recipient_name: str | None = None,
    contact_id: str | None = None,
) -> None:
    name = (recipient_name or "").strip()
    if contact_id and not name:
        contact = get_contact(contact_id)
        if contact:
            name = contact.name

    first = name.split()[0] if name else "there"
    plain = f"Hi {first},\n\n{message}\n\n— {os.getenv('MAIL_SIGN_NAME', 'Muteeb Ur Rehman')}\n{BRAND}\n"

    send_raw_email(
        to_addrs=[to_email.strip().lower()],
        subject=subject.strip(),
        plain_body=plain,
        html_body=render_admin_message_html(
            recipient_name=first,
            message=message.strip(),
            subject=subject.strip(),
        ),
    )

    if contact_id:
        try:
            mark_contact_replied(contact_id)
        except Exception:
            logger.exception("Could not mark contact %s as replied after message", contact_id)

    logger.info("Admin message sent to <%s> subject=%s", to_email, subject)
