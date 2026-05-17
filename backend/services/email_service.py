"""SMTP delivery for portfolio contact notifications."""

from __future__ import annotations

import logging
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from schemas.contact import ContactSubmission
from services.contact_email_html import render_contact_notification_html
from services.contact_urls import public_contact_form_url

logger = logging.getLogger(__name__)

SMTP_TIMEOUT_SEC = float(os.getenv("SMTP_TIMEOUT_SECONDS", "20"))
BRAND = os.getenv("MAIL_BRAND_NAME", "Muteeb Labs")


def _env_bool(name: str, default: bool = True) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in ("1", "true", "yes", "on")


def _smtp_settings() -> tuple[str, int, bool]:
    host = os.getenv("EMAIL_HOST") or os.getenv("SMTP_HOST")
    port = int(os.getenv("EMAIL_PORT") or os.getenv("SMTP_PORT", "587"))
    use_tls = _env_bool("EMAIL_USE_TLS", True)
    return host or "", port, use_tls


def _topic(data: ContactSubmission) -> str | None:
    t = (data.topic or data.service or "").strip()
    return t or None


def _build_plain_body(data: ContactSubmission) -> str:
    lines = [
        f"Name: {data.name}",
        f"Email: {data.email!s}",
    ]
    topic = _topic(data)
    if topic:
        lines.append(f"Project type: {topic}")
    if data.company:
        lines.append(f"Company: {data.company}")
    if data.phone:
        lines.append(f"Phone: {data.phone}")
    lines.extend(["", "Message:", data.message])
    lines.extend(["", f"Form: {public_contact_form_url()}"])
    return "\n".join(lines)


def send_contact_notification(data: ContactSubmission) -> None:
    smtp_host, smtp_port, use_tls = _smtp_settings()
    email_user = os.getenv("EMAIL_USER")
    email_pass = os.getenv("EMAIL_PASS")

    missing = [
        key
        for key, val in (
            ("EMAIL_HOST", smtp_host),
            ("EMAIL_USER", email_user),
            ("EMAIL_PASS", email_pass),
        )
        if not val
    ]
    if missing:
        raise RuntimeError(f"Missing required env vars: {', '.join(missing)}")

    recipient = email_user
    reply_to_addr = str(data.email)
    topic = _topic(data)
    topic_bit = f" — {topic}" if topic else ""

    plain = _build_plain_body(data)
    html_body = render_contact_notification_html(data)

    mime = MIMEMultipart("alternative")
    mime["Subject"] = f"New inquiry{topic_bit} — {BRAND}"
    mime["From"] = email_user
    mime["To"] = recipient
    mime["Reply-To"] = reply_to_addr
    mime.attach(MIMEText(plain, "plain", "utf-8"))
    mime.attach(MIMEText(html_body, "html", "utf-8"))

    envelope = mime.as_string()
    logger.info("Sending SMTP from %s subject=%s", email_user, mime["Subject"])

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=SMTP_TIMEOUT_SEC) as smtp:
            smtp.ehlo()
            if use_tls and smtp.has_extn("STARTTLS"):
                smtp.starttls(context=ssl.create_default_context())
                smtp.ehlo()

            password = "".join((email_pass or "").splitlines())
            smtp.login(email_user, password)

            refused = smtp.sendmail(email_user, [recipient], envelope)
            if refused:
                raise RuntimeError(f"SMTP recipients refused: {refused}")
    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check EMAIL_USER / EMAIL_PASS")
        raise
    except (OSError, smtplib.SMTPException):
        logger.exception("SMTP send failed")
        raise
