"""Branded HTML templates for discovery-call booking emails."""

from __future__ import annotations

from services.booking_store import BookingRecord
from services.booking_urls import booking_cancel_url
from services.mail_layout import (
    BRAND,
    CONTACT_EMAIL,
    SITE_URL,
    TEXT,
    TEXT_DIM,
    TEXT_MUTED,
    accent_divider,
    cta_button,
    esc,
    esc_attr,
    info_box,
    meta_row,
    render_email,
    secondary_link,
    signature_block,
    site_label,
)


def _book_page_url() -> str:
    return f"{SITE_URL.rstrip('/')}/book"


def _meet_button_label(link: str) -> str:
    if "meet.google" in link:
        return "Join Google Meet"
    if "zoom.us" in link:
        return "Join Zoom meeting"
    return "Join meeting"


def render_team_booking_html(
    *,
    booking: BookingRecord,
    when: str,
    when_admin_reference: str | None = None,
) -> str:
    when_rows = [meta_row("When", when)]
    if when_admin_reference:
        when_rows.append(meta_row("Pakistan time", when_admin_reference))
    rows = "".join(
        (
            meta_row("Name", booking.name),
            meta_row("Email", booking.email),
            meta_row("Company", booking.company),
            meta_row("Phone", booking.phone),
            *when_rows,
            meta_row("Booking ID", booking.id),
            meta_row("HubSpot deal", booking.hubspot_deal_id),
        )
    )
    notes_block = ""
    if booking.notes and booking.notes.strip():
        notes = esc(booking.notes).replace("\n", "<br />\n")
        notes_block = (
            f'<p style="margin:20px 0 8px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
            f'letter-spacing:0.14em;text-transform:uppercase;">Discussion notes</p>'
            f'<div style="padding:14px 16px;background:#0a1220;border:1px solid rgba(51,65,85,0.65);'
            f'border-left:4px solid #0ea5e9;border-radius:0 14px 14px 0;'
            f'color:{TEXT};font-size:15px;line-height:1.6;">{notes}</div>'
        )

    cancel_block = ""
    if booking.cancel_token:
        cancel_url = booking_cancel_url(booking.cancel_token)
        cancel_block = info_box(
            "Cancel link",
            f'{secondary_link(cancel_url, "Open cancel page")}<br/>'
            f'<span style="color:{TEXT_DIM};font-size:11px;word-break:break-all;">{esc(cancel_url)}</span>',
        )

    body = (
        f'<p style="margin:0;padding:22px 0 12px;color:{TEXT_MUTED};font-size:15px;line-height:1.6;">'
        f"A new discovery call was booked on <strong style=\"color:{TEXT};\">{esc(site_label())}</strong>.</p>"
        f"{accent_divider()}"
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0">{rows}</table>'
        f"{notes_block}"
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;">'
        f"<tr><td style=\"padding:16px;background:#0a1220;border:1px solid rgba(51,65,85,0.65);"
        f'border-radius:14px;">'
        f'<p style="margin:0 0 12px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
        f'letter-spacing:0.1em;text-transform:uppercase;">Meeting link</p>'
        f"{cta_button(booking.meeting_link, _meet_button_label(booking.meeting_link))}"
        f'<p style="margin:12px 0 0;color:{TEXT_DIM};font-size:11px;line-height:1.45;word-break:break-all;">'
        f"{esc(booking.meeting_link)}</p></td></tr></table>"
        f"{cancel_block}"
    )

    return render_email(
        page_title=f"New discovery call — {BRAND}",
        preview_text=f"New booking from {booking.name} — {when}",
        header_eyebrow=BRAND.upper(),
        header_title="New discovery call",
        header_subtitle="Reply to the client from your inbox — their email is on the booking.",
        body_html=body,
        footer_html=(
            f'<strong style="color:{TEXT_MUTED};">{esc(BRAND)}</strong> booking pipeline · '
            f"Internal notification"
        ),
    )


def render_client_booking_html(*, booking: BookingRecord, when: str, first_name: str) -> str:
    cancel_section = ""
    if booking.cancel_token:
        cancel_url = booking_cancel_url(booking.cancel_token)
        cancel_section = info_box(
            "Need to cancel?",
            "Cancelling frees this slot for other clients. "
            f'{cta_button(cancel_url, "Cancel booking")}<br/><br/>'
            f"To reschedule, cancel first then "
            f'{secondary_link(_book_page_url(), "book a new time")}.',
        )

    body = (
        f'<p style="margin:0;padding:22px 0 8px;color:{TEXT_MUTED};font-size:15px;line-height:1.65;">'
        f"Hi <strong style=\"color:{TEXT};\">{esc(first_name)}</strong> — your discovery call is confirmed.</p>"
        f"{accent_divider()}"
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0">'
        f"{meta_row('When', when)}"
        f"{meta_row('With', BRAND)}"
        f"</table>"
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;">'
        f"<tr><td style=\"padding:18px;background:#0a1220;border:1px solid rgba(51,65,85,0.65);"
        f'border-radius:14px;text-align:center;">'
        f'<p style="margin:0 0 14px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
        f'letter-spacing:0.12em;text-transform:uppercase;">Meeting link</p>'
        f"{cta_button(booking.meeting_link, _meet_button_label(booking.meeting_link))}"
        f'<p style="margin:14px 0 0;color:{TEXT_DIM};font-size:12px;line-height:1.5;">'
        f"Join at the scheduled time using the button above.</p>"
        f"</td></tr></table>"
        f"{cancel_section}"
        f"{signature_block()}"
    )

    return render_email(
        page_title=f"Discovery call confirmed — {BRAND}",
        preview_text=f"Your call is confirmed for {when}",
        header_eyebrow=BRAND.upper(),
        header_title="You're booked",
        header_subtitle="Check this email for your meeting link, time, and cancel option.",
        body_html=body,
        footer_html=(
            f"Questions? Email "
            f'<a href="mailto:{esc_attr(CONTACT_EMAIL)}" style="color:{TEXT_MUTED};text-decoration:none;">'
            f"{esc(CONTACT_EMAIL)}</a>"
        ),
    )


def render_team_cancel_html(
    *,
    booking: BookingRecord,
    when: str,
    when_admin_reference: str | None = None,
) -> str:
    when_rows = [meta_row("Was scheduled", when)]
    if when_admin_reference:
        when_rows.append(meta_row("Pakistan time", when_admin_reference))
    rows = "".join(
        (
            meta_row("Name", booking.name),
            meta_row("Email", booking.email),
            *when_rows,
            meta_row("Booking ID", booking.id),
        )
    )
    body = (
        f'<p style="margin:0;padding:22px 0 12px;color:{TEXT_MUTED};font-size:15px;line-height:1.6;">'
        f"A discovery call was cancelled. The time slot is <strong style=\"color:{TEXT};\">open again</strong> "
        f"for other clients.</p>"
        f"{accent_divider()}"
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0">{rows}</table>'
    )
    return render_email(
        page_title=f"Booking cancelled — {BRAND}",
        preview_text=f"{booking.name} cancelled — slot freed",
        header_eyebrow=BRAND.upper(),
        header_title="Booking cancelled",
        header_subtitle="The slot is available on the schedule again.",
        body_html=body,
        footer_html=f'<strong style="color:{TEXT_MUTED};">{esc(BRAND)}</strong> booking pipeline',
    )


def render_client_cancel_html(*, when: str, first_name: str) -> str:
    body = (
        f'<p style="margin:0;padding:22px 0 8px;color:{TEXT_MUTED};font-size:15px;line-height:1.65;">'
        f"Hi <strong style=\"color:{TEXT};\">{esc(first_name)}</strong> — your discovery call on "
        f"<strong style=\"color:{TEXT};\">{esc(when)}</strong> has been cancelled.</p>"
        f"{accent_divider()}"
        f'<p style="margin:0 0 18px;color:{TEXT_MUTED};font-size:14px;line-height:1.65;">'
        f"When you're ready, you can pick a new time on our website.</p>"
        f"{cta_button(_book_page_url(), 'Book a new call')}"
        f"{signature_block()}"
    )
    return render_email(
        page_title=f"Call cancelled — {BRAND}",
        preview_text=f"Your discovery call on {when} was cancelled",
        header_eyebrow=BRAND.upper(),
        header_title="Booking cancelled",
        header_subtitle="No further action needed unless you want to rebook.",
        body_html=body,
        footer_html=(
            f"Questions? "
            f'<a href="mailto:{esc_attr(CONTACT_EMAIL)}" style="color:{TEXT_MUTED};text-decoration:none;">'
            f"{esc(CONTACT_EMAIL)}</a>"
        ),
    )
