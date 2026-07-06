"""Email notifications when a discovery call is booked or cancelled."""

from __future__ import annotations

import logging
import os
from datetime import datetime

from services.booking_email_html import (
    render_client_booking_html,
    render_client_cancel_html,
    render_team_booking_html,
    render_team_cancel_html,
)
from services.booking_store import BookingRecord
from services.booking_urls import booking_cancel_url
from services.email_service import admin_notification_recipients, send_raw_email, smtp_connection

logger = logging.getLogger(__name__)
BRAND = os.getenv("MAIL_BRAND_NAME", "Muteeb Labs")
# Shown only in admin booking notifications — not on the public site or client emails.
ADMIN_REFERENCE_TZ = os.getenv("BOOKING_ADMIN_REFERENCE_TIMEZONE", "Asia/Karachi").strip() or "Asia/Karachi"


def _format_when(starts_at: datetime, tz_name: str) -> str:
    try:
        from zoneinfo import ZoneInfo

        local = starts_at.astimezone(ZoneInfo(tz_name))
        return local.strftime("%A, %d %B %Y at %I:%M %p %Z")
    except Exception:
        return starts_at.strftime("%Y-%m-%d %H:%M UTC")


def _format_admin_reference_when(starts_at: datetime, booking_tz_name: str) -> str | None:
    """Pakistan (or other admin) time for internal inbox notifications."""
    if not ADMIN_REFERENCE_TZ or ADMIN_REFERENCE_TZ == booking_tz_name:
        return None
    return _format_when(starts_at, ADMIN_REFERENCE_TZ)


def send_booking_emails(booking: BookingRecord, tz_name: str) -> None:
    when = _format_when(booking.starts_at, tz_name)
    when_admin = _format_admin_reference_when(booking.starts_at, tz_name)
    team_recipients = admin_notification_recipients()
    if not team_recipients:
        logger.warning("No admin recipients (EMAIL_TO / EMAIL_ADMIN_COPY) — skipping team booking email")

    team_subject = f"[{BRAND}] New discovery call — {booking.name} ({when})"
    team_body = (
        f"New booking on the website.\n\n"
        f"Name: {booking.name}\n"
        f"Email: {booking.email}\n"
        f"Company: {booking.company or '—'}\n"
        f"Phone: {booking.phone or '—'}\n"
        f"When: {when}\n"
    )
    if when_admin:
        team_body += f"Pakistan time: {when_admin}\n"
    team_body += (
        f"Meeting link: {booking.meeting_link}\n"
        f"Notes: {booking.notes or '—'}\n"
        f"Booking ID: {booking.id}\n"
    )
    if booking.hubspot_deal_id:
        team_body += f"\nHubSpot deal: {booking.hubspot_deal_id}\n"
    if booking.cancel_token:
        team_body += f"\nCancel link: {booking_cancel_url(booking.cancel_token)}\n"

    first = booking.name.split()[0] if booking.name else "there"
    client_subject = f"Your discovery call with {BRAND} is confirmed"
    client_body = (
        f"Hi {first},\n\n"
        f"Your discovery call is confirmed.\n\n"
        f"When: {when}\n"
        f"Join link: {booking.meeting_link}\n\n"
        f"We'll use this time to understand your project and outline next steps.\n\n"
    )
    if booking.cancel_token:
        client_body += (
            f"Need to cancel? Use this link (frees the slot for others):\n"
            f"{booking_cancel_url(booking.cancel_token)}\n\n"
        )
    client_body += (
        f"If you need to reschedule, cancel first then book a new time on our website.\n\n"
        f"— {os.getenv('MAIL_SIGN_NAME', 'Muteeb Ur Rehman')}\n"
        f"{BRAND}\n"
    )

    try:
        with smtp_connection() as (smtp, email_user):
            if team_recipients:
                try:
                    send_raw_email(
                        to_addrs=team_recipients,
                        subject=team_subject,
                        plain_body=team_body,
                        html_body=render_team_booking_html(
                            booking=booking,
                            when=when,
                            when_admin_reference=when_admin,
                        ),
                        reply_to=booking.email,
                        smtp=smtp,
                        email_user=email_user,
                    )
                except Exception:
                    logger.exception("Team booking email failed")

            try:
                send_raw_email(
                    to_addrs=[booking.email],
                    subject=client_subject,
                    plain_body=client_body,
                    html_body=render_client_booking_html(
                        booking=booking,
                        when=when,
                        first_name=first,
                    ),
                    smtp=smtp,
                    email_user=email_user,
                )
            except Exception:
                logger.exception("Client booking confirmation email failed for <%s>", booking.email)
    except Exception:
        logger.exception("SMTP connection failed for booking emails %s", booking.id)


def send_booking_cancelled_email(booking: BookingRecord, tz_name: str) -> None:
    when = _format_when(booking.starts_at, tz_name)
    when_admin = _format_admin_reference_when(booking.starts_at, tz_name)
    team_recipients = admin_notification_recipients()
    first = booking.name.split()[0] if booking.name else "there"

    try:
        with smtp_connection() as (smtp, email_user):
            if team_recipients:
                try:
                    cancel_plain = (
                        f"Booking cancelled.\n\n"
                        f"Name: {booking.name}\n"
                        f"Email: {booking.email}\n"
                        f"Was scheduled: {when}\n"
                    )
                    if when_admin:
                        cancel_plain += f"Pakistan time: {when_admin}\n"
                    cancel_plain += (
                        f"Booking ID: {booking.id}\n"
                        f"The time slot is now available for other clients.\n"
                    )
                    send_raw_email(
                        to_addrs=team_recipients,
                        subject=f"[{BRAND}] Booking cancelled — {booking.name}",
                        plain_body=cancel_plain,
                        html_body=render_team_cancel_html(
                            booking=booking,
                            when=when,
                            when_admin_reference=when_admin,
                        ),
                        reply_to=booking.email,
                        smtp=smtp,
                        email_user=email_user,
                    )
                except Exception:
                    logger.exception("Team cancel email failed")

            try:
                send_raw_email(
                    to_addrs=[booking.email],
                    subject=f"Discovery call cancelled — {BRAND}",
                    plain_body=(
                        f"Hi {first},\n\n"
                        f"Your discovery call on {when} has been cancelled.\n"
                        f"You can book another time on our website when ready.\n\n"
                        f"— {os.getenv('MAIL_SIGN_NAME', 'Muteeb Ur Rehman')}\n"
                        f"{BRAND}\n"
                    ),
                    html_body=render_client_cancel_html(when=when, first_name=first),
                    smtp=smtp,
                    email_user=email_user,
                )
            except Exception:
                logger.exception("Client cancel email failed")
    except Exception:
        logger.exception("SMTP connection failed for cancel emails %s", booking.id)
