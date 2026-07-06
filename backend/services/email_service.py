"""SMTP delivery for portfolio contact notifications and acknowledgments."""

from __future__ import annotations

import logging
import os
import smtplib
import ssl
from contextlib import contextmanager
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

from schemas.contact import ContactSubmission
from services.contact_ack_html import render_contact_acknowledgment_html
from services.contact_email_html import render_contact_notification_html
from services.contact_urls import public_contact_form_url
from services.email_mime import attach_branded_html

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


def _build_ack_plain_body(data: ContactSubmission) -> str:
    first_name = (data.name or "").strip().split()[0] if data.name else "there"
    reply_window = os.getenv("MAIL_REPLY_WINDOW", "usually within one day")
    site_url = (os.getenv("PUBLIC_SITE_URL") or "https://muteeblabs.com").rstrip("/")
    sign_name = os.getenv("MAIL_SIGN_NAME", "Muteeb Ur Rehman")
    sign_title = os.getenv("MAIL_SIGN_TITLE", "Full Stack Developer & AI Engineer")
    return (
        f"Hi {first_name},\n\n"
        f"AUTOMATED MESSAGE — This is not a personal reply to your inquiry.\n\n"
        f"Your contact form submission was received successfully. {sign_name} will email you "
        f"personally {reply_window} after reviewing your message.\n\n"
        f"Your message:\n{data.message}\n\n"
        f"— {sign_name}\n{sign_title}\n{site_url}\n"
    )


def _send_mime(
    smtp: smtplib.SMTP,
    envelope_sender: str,
    recipients: list[str],
    mime: MIMEMultipart,
) -> None:
    refused = smtp.sendmail(envelope_sender, recipients, mime.as_string())
    if refused:
        raise smtplib.SMTPRecipientsRefused(refused)


def smtp_delivery_detail(exc: BaseException) -> str:
    """Short admin-facing explanation for SMTP send failures."""
    if isinstance(exc, smtplib.SMTPAuthenticationError):
        return "SMTP login failed. Check EMAIL_USER and EMAIL_PASS in .env."

    if isinstance(exc, smtplib.SMTPRecipientsRefused):
        reasons: list[str] = []
        for _addr, (_code, msg) in exc.recipients.items():
            text = msg.decode("utf-8", errors="replace") if isinstance(msg, bytes) else str(msg)
            reasons.append(text)
        combined = " ".join(reasons)
        lower = combined.lower()
        if "quota" in lower or "limit" in lower:
            return (
                "Send blocked by your mail provider: outgoing email quota reached. "
                "Wait for the limit to reset or upgrade your email plan."
            )
        return f"Recipient rejected by mail server: {combined}"

    if isinstance(exc, smtplib.SMTPException):
        return f"SMTP error: {exc}"

    message = str(exc)
    if isinstance(exc, RuntimeError) and "Missing required env" in message:
        return f"SMTP not configured — {message}"

    return "Could not send message. Check SMTP settings and try again."


def _open_smtp() -> tuple[smtplib.SMTP, str, str]:
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

    ctx = ssl.create_default_context()
    if smtp_port == 465:
        smtp = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=SMTP_TIMEOUT_SEC, context=ctx)
        smtp.ehlo()
    else:
        smtp = smtplib.SMTP(smtp_host, smtp_port, timeout=SMTP_TIMEOUT_SEC)
        smtp.ehlo()
        if use_tls and smtp.has_extn("STARTTLS"):
            smtp.starttls(context=ctx)
            smtp.ehlo()

    password = "".join((email_pass or "").splitlines())
    smtp.login(email_user or "", password)
    return smtp, email_user or "", password


@contextmanager
def smtp_connection():
    """Single SMTP login — reuse for multiple sends in one booking/cancel flow."""
    smtp, email_user, _ = _open_smtp()
    try:
        yield smtp, email_user
    finally:
        try:
            smtp.quit()
        except smtplib.SMTPException:
            pass


def _from_addr(email_user: str) -> str:
    return (os.getenv("EMAIL_FROM") or email_user or "").strip()


def admin_notification_recipients(*, fallback_user: str | None = None) -> list[str]:
    """Inboxes that receive admin copies (booking alerts, contact form, cancellations)."""
    raw_parts: list[str] = []
    for key in ("EMAIL_TO", "EMAIL_ADMIN_COPY"):
        raw = os.getenv(key, "")
        if raw:
            raw_parts.extend(raw.split(","))
    if not raw_parts and fallback_user:
        raw_parts.append(fallback_user)

    seen: set[str] = set()
    recipients: list[str] = []
    for part in raw_parts:
        addr = part.strip()
        if not addr:
            continue
        key = addr.lower()
        if key in seen:
            continue
        seen.add(key)
        recipients.append(addr)
    return recipients


def send_contact_notification(
    data: ContactSubmission,
    *,
    smtp: smtplib.SMTP | None = None,
    email_user: str | None = None,
) -> None:
    """Send the styled notification to the inbox owner (admin)."""
    own_connection = smtp is None
    if own_connection:
        smtp, email_user, _ = _open_smtp()
    elif not email_user:
        email_user = os.getenv("EMAIL_USER") or ""

    assert smtp is not None
    try:
        from_addr = _from_addr(email_user or "")
        recipients = admin_notification_recipients(fallback_user=email_user)
        if not recipients:
            raise RuntimeError("No admin notification recipients configured (EMAIL_TO / EMAIL_ADMIN_COPY)")
        topic = _topic(data)
        topic_bit = f" — {topic}" if topic else ""

        mime = MIMEMultipart("related")
        mime["Subject"] = f"New inquiry{topic_bit} — {BRAND}"
        mime["From"] = formataddr((BRAND, from_addr))
        mime["To"] = ", ".join(recipients)
        mime["Reply-To"] = str(data.email)
        attach_branded_html(
            mime,
            plain_body=_build_plain_body(data),
            html_body=render_contact_notification_html(data),
        )

        logger.info(
            "Sending admin notification auth=%s from=%s to=%s subject=%s",
            email_user, from_addr, recipients, mime["Subject"],
        )
        _send_mime(smtp, email_user or "", recipients, mime)
    finally:
        if own_connection:
            try:
                smtp.quit()
            except smtplib.SMTPException:
                pass


def send_contact_acknowledgment(
    data: ContactSubmission,
    *,
    smtp: smtplib.SMTP | None = None,
    email_user: str | None = None,
) -> None:
    """Send a styled 'thanks for reaching out' email to the form submitter."""
    own_connection = smtp is None
    if own_connection:
        smtp, email_user, _ = _open_smtp()
    elif not email_user:
        email_user = os.getenv("EMAIL_USER") or ""

    assert smtp is not None
    try:
        from_addr = _from_addr(email_user or "")
        client_email = str(data.email).strip()
        if not client_email:
            raise RuntimeError("Cannot send acknowledgment: submitter email is empty")

        mime = MIMEMultipart("related")
        mime["Subject"] = f"Message received (automated) — {BRAND}"
        mime["From"] = formataddr((BRAND, from_addr))
        mime["To"] = client_email
        mime["Reply-To"] = formataddr((BRAND, from_addr))
        attach_branded_html(
            mime,
            plain_body=_build_ack_plain_body(data),
            html_body=render_contact_acknowledgment_html(data),
        )

        logger.info(
            "Sending client acknowledgment auth=%s from=%s to=%s",
            email_user, from_addr, client_email,
        )
        _send_mime(smtp, email_user or "", [client_email], mime)
    finally:
        if own_connection:
            try:
                smtp.quit()
            except smtplib.SMTPException:
                pass


def send_raw_email(
    *,
    to_addrs: list[str],
    subject: str,
    plain_body: str,
    html_body: str | None = None,
    reply_to: str | None = None,
    smtp: smtplib.SMTP | None = None,
    email_user: str | None = None,
) -> None:
    """Plain-text email with optional branded HTML (booking confirmations, alerts)."""
    recipients = [a.strip() for a in to_addrs if a and a.strip()]
    if not recipients:
        raise RuntimeError("No recipients for send_raw_email")

    own_connection = smtp is None
    if own_connection:
        smtp, email_user, _ = _open_smtp()
    elif not email_user:
        email_user = os.getenv("EMAIL_USER") or ""

    assert smtp is not None
    try:
        from_addr = _from_addr(email_user or "")
        mime = MIMEMultipart("related")
        mime["Subject"] = subject
        mime["From"] = formataddr((BRAND, from_addr))
        mime["To"] = ", ".join(recipients)
        if reply_to:
            mime["Reply-To"] = reply_to
        attach_branded_html(
            mime,
            plain_body=plain_body,
            html_body=html_body or plain_body,
        )
        _send_mime(smtp, email_user or "", recipients, mime)
    finally:
        if own_connection:
            try:
                smtp.quit()
            except smtplib.SMTPException:
                pass


def process_contact_submission(data: ContactSubmission) -> None:
    """
    Full contact email pipeline (admin notification + optional client ack).
    Uses one SMTP login when both messages are sent.
    """
    try:
        with smtp_connection() as (smtp, email_user):
            send_contact_notification(data, smtp=smtp, email_user=email_user)

            if not _env_bool("SEND_CLIENT_ACK", True):
                logger.info("SEND_CLIENT_ACK disabled — skipping client acknowledgment")
                return

            try:
                send_contact_acknowledgment(data, smtp=smtp, email_user=email_user)
            except Exception:  # noqa: BLE001 — never let ack failures fail admin notify
                logger.exception("Client acknowledgment send failed (admin notification OK)")
    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check EMAIL_USER / EMAIL_PASS")
        raise
    except (OSError, smtplib.SMTPException):
        logger.exception("Admin notification SMTP send failed")
        raise
