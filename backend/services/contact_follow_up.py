"""Background email delivery after contact form save."""

from __future__ import annotations

import logging
import threading

from schemas.contact import ContactSubmission
from services.email_service import process_contact_submission

logger = logging.getLogger(__name__)


def _run_contact_emails(data: ContactSubmission) -> None:
    try:
        process_contact_submission(data)
    except Exception:
        logger.exception("Contact emails failed for <%s>", data.email)


def schedule_contact_emails(data: ContactSubmission) -> None:
    threading.Thread(target=_run_contact_emails, args=(data,), daemon=True).start()
