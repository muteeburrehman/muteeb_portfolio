"""Branded HTML acknowledgment sent to contact form submitters."""

from __future__ import annotations

import os

from schemas.contact import ContactSubmission
from services.mail_layout import (
    BRAND,
    CONTACT_EMAIL,
    SIGN_NAME,
    TEXT,
    TEXT_DIM,
    TEXT_MUTED,
    accent_divider,
    esc,
    esc_attr,
    info_box,
    render_email,
    signature_block,
)


def _topic_label(data: ContactSubmission) -> str | None:
    return (data.topic or data.service or "").strip() or None


def render_contact_acknowledgment_html(data: ContactSubmission) -> str:
    first_name = (data.name or "").strip().split()[0] if data.name else "there"
    topic = _topic_label(data)
    reply_window = os.getenv("MAIL_REPLY_WINDOW", "usually within one day")
    topic_line = (
        f'<p style="margin:18px 0 0;color:{TEXT_DIM};font-size:13px;line-height:1.55;">'
        f"Project type: <span style=\"color:{TEXT_MUTED};font-weight:500;\">{esc(topic)}</span></p>"
        if topic
        else ""
    )
    message_block = esc(data.message).replace("\r\n", "\n").replace("\n", "<br />\n")

    body = (
        info_box(
            "Automated message",
            f"This is an automated confirmation — not a personal reply yet. "
            f"{esc(SIGN_NAME)} will email you personally {esc(reply_window)} after reviewing your message.",
        )
        + f'<p style="margin:18px 0 0;color:{TEXT_MUTED};font-size:14px;line-height:1.65;">'
        f"A copy of your submission is below. If anything looks wrong, reply to this email or write to "
        f'<a href="mailto:{esc_attr(CONTACT_EMAIL)}" style="color:#0ea5e9;text-decoration:none;">'
        f"{esc(CONTACT_EMAIL)}</a>.</p>"
        + accent_divider()
        + f'<p style="margin:14px 0 8px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
        f'letter-spacing:0.14em;text-transform:uppercase;">Your message</p>'
        + f'<div style="padding:14px 16px;background:#0a1220;border:1px solid rgba(51,65,85,0.65);'
        f'border-left:4px solid #0ea5e9;border-radius:0 14px 14px 0;'
        f'color:{TEXT};font-size:15px;line-height:1.6;">{message_block}</div>'
        + topic_line
        + signature_block()
    )

    return render_email(
        page_title=f"Message received — {BRAND}",
        preview_text=f"Automated confirmation — personal reply {reply_window}.",
        header_eyebrow=BRAND.upper(),
        header_title="We received your message",
        header_subtitle=f"Hi {esc(first_name)} — thanks for reaching out to MuteebLabs.",
        body_html=body,
        footer_html=(
            f'<strong style="color:{TEXT_MUTED};">{esc(BRAND)}</strong> contact form · '
            f"No action required unless you did not submit this form."
        ),
    )
