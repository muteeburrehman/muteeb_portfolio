"""Branded HTML for admin-composed messages to contacts or custom recipients."""

from __future__ import annotations

from services.mail_layout import (
    BRAND,
    CONTACT_EMAIL,
    TEXT,
    TEXT_MUTED,
    accent_divider,
    esc,
    esc_attr,
    render_email,
    signature_block,
)


def render_admin_message_html(*, recipient_name: str, message: str, subject: str) -> str:
    greeting = esc(recipient_name.strip()) if recipient_name.strip() else "there"
    body_html = esc(message).replace("\n", "<br />\n")
    body = (
        f'<p style="margin:0;padding:22px 0 8px;color:{TEXT_MUTED};font-size:15px;line-height:1.65;">'
        f"Hi <strong style=\"color:{TEXT};\">{greeting}</strong>,</p>"
        f"{accent_divider()}"
        f'<div style="color:{TEXT};font-size:15px;line-height:1.7;">{body_html}</div>'
        f"{signature_block()}"
    )
    return render_email(
        page_title=f"{subject} — {BRAND}",
        preview_text=message[:120],
        header_eyebrow=BRAND.upper(),
        header_title=subject,
        header_subtitle="A message from the MuteebLabs team.",
        body_html=body,
        footer_html=(
            f"Reply to "
            f'<a href="mailto:{esc_attr(CONTACT_EMAIL)}" style="color:{TEXT_MUTED};text-decoration:none;">'
            f"{esc(CONTACT_EMAIL)}</a>"
        ),
    )
