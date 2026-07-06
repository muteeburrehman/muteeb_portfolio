"""Branded HTML for portfolio contact notifications (admin inbox)."""

from __future__ import annotations

from schemas.contact import ContactSubmission
from services.contact_urls import public_contact_form_url
from services.mail_layout import (
    BRAND,
    TEXT,
    TEXT_DIM,
    TEXT_MUTED,
    accent_divider,
    cta_button,
    esc,
    meta_row,
    render_email,
)


def _topic_label(data: ContactSubmission) -> str | None:
    return (data.topic or data.service or "").strip() or None


def render_contact_notification_html(data: ContactSubmission) -> str:
    topic = _topic_label(data)
    rows = "".join(
        (
            meta_row("Name", data.name),
            meta_row("Reply to", str(data.email)),
            meta_row("Project type", topic),
            meta_row("Company", data.company),
            meta_row("Phone", data.phone),
        )
    )
    message_block = esc(data.message).replace("\r\n", "\n").replace("\n", "<br />\n")
    raw_snippet = data.message.replace("\r\n", " ").replace("\n", " ").strip()
    snippet = esc(raw_snippet[:120] + ("…" if len(raw_snippet) > 120 else ""))
    form_url = public_contact_form_url()

    body = (
        f'<p style="margin:0;padding:22px 0 16px;color:{TEXT_MUTED};font-size:15px;line-height:1.6;">'
        f"Someone submitted your contact form. Hit <strong style=\"color:{TEXT};\">Reply</strong> "
        f"in your mail app — we set the visitor&apos;s address for you.</p>"
        f"{accent_divider()}"
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0">{rows}</table>'
        f'<p style="margin:24px 0 10px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
        f'letter-spacing:0.14em;text-transform:uppercase;">Message</p>'
        f'<div style="padding:14px 16px;background:#0a1220;border:1px solid rgba(51,65,85,0.65);'
        f'border-left:4px solid #0ea5e9;border-radius:0 14px 14px 0;'
        f'color:{TEXT};font-size:15px;line-height:1.6;">{message_block}</div>'
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;">'
        f"<tr><td style=\"padding:16px;background:#0a1220;border:1px solid rgba(51,65,85,0.65);"
        f'border-radius:14px;">'
        f'<p style="margin:0 0 12px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
        f'letter-spacing:0.1em;text-transform:uppercase;">Source</p>'
        f"{cta_button(form_url, 'Open contact page')}"
        f'<p style="margin:12px 0 0;color:{TEXT_DIM};font-size:11px;line-height:1.45;word-break:break-all;">'
        f"{esc(form_url)}</p></td></tr></table>"
    )

    return render_email(
        page_title=f"New inquiry — {BRAND}",
        preview_text=f"New message from {esc(data.name)} — {snippet}",
        header_eyebrow=BRAND.upper(),
        header_title="New portfolio inquiry",
        header_subtitle="A lead just came in from your website.",
        body_html=body,
        footer_html=(
            f'<strong style="color:{TEXT_MUTED};">{esc(BRAND)}</strong> contact pipeline · '
            f"Internal notification"
        ),
    )
