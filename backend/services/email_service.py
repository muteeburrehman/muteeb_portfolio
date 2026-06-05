"""SMTP delivery for portfolio contact notifications and acknowledgments."""

from __future__ import annotations

import logging
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

from schemas.contact import ContactSubmission
from services.contact_ack_html import render_contact_acknowledgment_html
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


def _build_ack_plain_body(data: ContactSubmission) -> str:
    first_name = (data.name or "").strip().split()[0] if data.name else "there"
    reply_window = os.getenv("MAIL_REPLY_WINDOW", "usually within one day")
    site_url = (os.getenv("PUBLIC_SITE_URL") or "https://dev.muteeblabs.uk").rstrip("/")
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
        raise RuntimeError(f"SMTP recipients refused: {refused}")


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

    smtp = smtplib.SMTP(smtp_host, smtp_port, timeout=SMTP_TIMEOUT_SEC)
    smtp.ehlo()
    if use_tls and smtp.has_extn("STARTTLS"):
        smtp.starttls(context=ssl.create_default_context())
        smtp.ehlo()

    password = "".join((email_pass or "").splitlines())
    smtp.login(email_user or "", password)
    return smtp, email_user or "", password


def _from_addr(email_user: str) -> str:
    return (os.getenv("EMAIL_FROM") or email_user or "").strip()


def _admin_recipient(email_user: str) -> str:
    return (os.getenv("EMAIL_TO") or email_user or "").strip()


def send_contact_notification(data: ContactSubmission) -> None:
    """Send the styled notification to the inbox owner (admin)."""
    smtp, email_user, _ = _open_smtp()
    try:
        from_addr = _from_addr(email_user)
        recipient = _admin_recipient(email_user)
        topic = _topic(data)
        topic_bit = f" — {topic}" if topic else ""

        mime = MIMEMultipart("alternative")
        mime["Subject"] = f"New inquiry{topic_bit} — {BRAND}"
        mime["From"] = formataddr((BRAND, from_addr))
        mime["To"] = recipient
        mime["Reply-To"] = str(data.email)
        mime.attach(MIMEText(_build_plain_body(data), "plain", "utf-8"))
        mime.attach(MIMEText(render_contact_notification_html(data), "html", "utf-8"))

        logger.info(
            "Sending admin notification auth=%s from=%s to=%s subject=%s",
            email_user, from_addr, recipient, mime["Subject"],
        )
        _send_mime(smtp, email_user, [recipient], mime)
    finally:
        try:
            smtp.quit()
        except smtplib.SMTPException:
            pass


def send_contact_acknowledgment(data: ContactSubmission) -> None:
    """Send a styled 'thanks for reaching out' email to the form submitter."""
    smtp, email_user, _ = _open_smtp()
    try:
        from_addr = _from_addr(email_user)
        client_email = str(data.email).strip()
        if not client_email:
            raise RuntimeError("Cannot send acknowledgment: submitter email is empty")

        mime = MIMEMultipart("alternative")
        mime["Subject"] = f"Message received (automated) — {BRAND}"
        mime["From"] = formataddr((BRAND, from_addr))
        mime["To"] = client_email
        mime["Reply-To"] = formataddr((BRAND, from_addr))
        mime.attach(MIMEText(_build_ack_plain_body(data), "plain", "utf-8"))
        mime.attach(MIMEText(render_contact_acknowledgment_html(data), "html", "utf-8"))

        logger.info(
            "Sending client acknowledgment auth=%s from=%s to=%s",
            email_user, from_addr, client_email,
        )
        _send_mime(smtp, email_user, [client_email], mime)
    finally:
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
) -> None:
    """Plain-text email with optional branded HTML (booking confirmations, alerts)."""
    recipients = [a.strip() for a in to_addrs if a and a.strip()]
    if not recipients:
        raise RuntimeError("No recipients for send_raw_email")

    smtp, email_user, _ = _open_smtp()
    try:
        from_addr = _from_addr(email_user)
        mime = MIMEMultipart("alternative")
        mime["Subject"] = subject
        mime["From"] = formataddr((BRAND, from_addr))
        mime["To"] = ", ".join(recipients)
        if reply_to:
            mime["Reply-To"] = reply_to
        mime.attach(MIMEText(plain_body, "plain", "utf-8"))
        if html_body:
            mime.attach(MIMEText(html_body, "html", "utf-8"))
        _send_mime(smtp, email_user, recipients, mime)
    finally:
        try:
            smtp.quit()
        except smtplib.SMTPException:
            pass


def process_contact_submission(data: ContactSubmission) -> None:
    """
    Full contact pipeline:

    1. Send admin notification (required — failure raises).
    2. Optionally send client acknowledgment (best-effort — failure logged,
       does not bubble up so the form still appears successful to the visitor).
    """
    try:
        send_contact_notification(data)
    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check EMAIL_USER / EMAIL_PASS")
        raise
    except (OSError, smtplib.SMTPException):
        logger.exception("Admin notification SMTP send failed")
        raise

    if not _env_bool("SEND_CLIENT_ACK", True):
        logger.info("SEND_CLIENT_ACK disabled — skipping client acknowledgment")
        return

    try:
        send_contact_acknowledgment(data)
    except Exception:  # noqa: BLE001 — never let ack failures fail the request
        logger.exception("Client acknowledgment send failed (admin notification OK)")
