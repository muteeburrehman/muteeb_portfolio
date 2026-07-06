"""Shared Muteeb Labs branded email layout (dark theme, table + inline CSS)."""

from __future__ import annotations

import html
import os

BG_OUTER = "#0a0a0a"
CARD = "#161616"
CARD_BORDER = "#2a2a2a"
TEXT = "#f5f5f5"
TEXT_MUTED = "#a3a3a3"
TEXT_DIM = "#737373"
SKY = "#38bdf8"
PURPLE = "#a855f7"
ACCENT_BAR = f"linear-gradient(90deg,{SKY},{PURPLE})"

BRAND = os.getenv("MAIL_BRAND_NAME", "Muteeb Labs")
SIGN_NAME = os.getenv("MAIL_SIGN_NAME", "Muteeb Ur Rehman")
SIGN_TITLE = os.getenv("MAIL_SIGN_TITLE", "Full Stack Developer & AI Engineer")
SITE_URL = (os.getenv("PUBLIC_SITE_URL") or "https://muteeblabs.com").rstrip("/")
CONTACT_EMAIL = (os.getenv("EMAIL_FROM") or os.getenv("EMAIL_TO") or "info@muteeblabs.com").strip()


def esc(value: object) -> str:
    return html.escape(str(value), quote=False)


def esc_attr(value: object) -> str:
    return html.escape(str(value), quote=True)


def site_label() -> str:
    return SITE_URL.replace("https://", "").replace("http://", "")


def meta_row(label: str, value: str | None) -> str:
    if not value or not str(value).strip():
        return ""
    return (
        "<tr>"
        f'<td width="128" valign="top" style="width:128px;padding:10px 12px 10px 0;'
        f"border-bottom:1px solid {CARD_BORDER};vertical-align:top;\">"
        f'<p style="margin:0;color:{TEXT_DIM};font-size:11px;font-weight:600;'
        f'letter-spacing:0.08em;text-transform:uppercase;">{esc(label)}</p>'
        "</td>"
        f'<td valign="top" style="padding:10px 0;border-bottom:1px solid {CARD_BORDER};">'
        f'<p style="margin:0;color:{TEXT};font-size:15px;line-height:1.5;font-weight:500;">'
        f"{esc(value)}</p>"
        "</td>"
        "</tr>"
    )


def accent_divider() -> str:
    return (
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 20px;">'
        f"<tr><td style=\"height:3px;background:{SKY};background:{ACCENT_BAR};"
        f'border-radius:2px;font-size:0;">&#8203;</td></tr></table>'
    )


def cta_button(href: str, label: str) -> str:
    return (
        f'<a href="{esc_attr(href)}" target="_blank" rel="noopener noreferrer" '
        f'style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;'
        f"color:#ffffff;text-decoration:none;border-radius:8px;"
        f'background:linear-gradient(135deg,{SKY},{PURPLE});">{esc(label)}</a>'
    )


def secondary_link(href: str, label: str) -> str:
    return (
        f'<a href="{esc_attr(href)}" style="color:{SKY};text-decoration:none;'
        f'font-weight:500;">{esc(label)}</a>'
    )


def signature_block() -> str:
    site_href = esc_attr(SITE_URL)
    site_lbl = esc(site_label())
    return (
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;">'
        f"<tr><td style=\"padding-top:18px;border-top:1px solid {CARD_BORDER};\">"
        f'<p style="margin:0;color:{TEXT};font-size:14px;line-height:1.5;font-weight:600;">{esc(SIGN_NAME)}</p>'
        f'<p style="margin:2px 0 0;color:{TEXT_DIM};font-size:12px;line-height:1.5;">{esc(SIGN_TITLE)}</p>'
        f'<p style="margin:6px 0 0;color:{TEXT_DIM};font-size:12px;line-height:1.5;">'
        f'<a href="{site_href}" target="_blank" rel="noopener noreferrer" '
        f'style="color:{SKY};text-decoration:none;">{site_lbl}</a></p>'
        "</td></tr></table>"
    )


def info_box(title: str, body_html: str) -> str:
    return (
        f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:18px 0 0;">'
        f"<tr><td style=\"padding:14px 16px;background:#0f0f0f;border:1px solid {CARD_BORDER};"
        f'border-radius:10px;">'
        f'<p style="margin:0 0 8px;color:{TEXT_DIM};font-size:10px;font-weight:700;'
        f'letter-spacing:0.12em;text-transform:uppercase;">{esc(title)}</p>'
        f'<p style="margin:0;color:{TEXT_MUTED};font-size:13px;line-height:1.65;">{body_html}</p>'
        "</td></tr></table>"
    )


def render_email(
    *,
    page_title: str,
    preview_text: str,
    header_eyebrow: str | None,
    header_title: str,
    header_subtitle: str,
    body_html: str,
    footer_html: str,
) -> str:
    eyebrow = (
        f'<p style="margin:0 0 6px;color:rgba(255,255,255,0.85);font-size:10px;font-weight:700;'
        f'letter-spacing:0.28em;text-transform:uppercase;">{esc(header_eyebrow or BRAND.upper())}</p>'
    )
    return f"""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>{esc(page_title)}</title>
</head>
<body style="margin:0;padding:0;background:{BG_OUTER};
 font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;font-size:1px;color:{BG_OUTER};line-height:1px;max-height:0;opacity:0;overflow:hidden;mso-hide:all;">
    {esc(preview_text)}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:{BG_OUTER};padding:32px 16px 48px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;">

          <tr>
            <td style="border-radius:16px 16px 0 0;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:{SKY};background:linear-gradient(125deg,{SKY} 0%,{PURPLE} 100%);
                    padding:28px 28px 30px;">
                    {eyebrow}
                    <p style="margin:0;color:#ffffff;font-size:24px;font-weight:800;line-height:1.15;
                      font-family:Georgia,'Times New Roman',serif;">{esc(header_title)}</p>
                    <p style="margin:14px 0 0;color:rgba(255,255,255,0.92);font-size:14px;line-height:1.55;">
                      {header_subtitle}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:{CARD};padding:0 26px 28px;border:1px solid {CARD_BORDER};
              border-top:none;border-radius:0 0 16px 16px;">
              {body_html}
            </td>
          </tr>

          <tr>
            <td style="padding:22px 8px 0;text-align:center;">
              <p style="margin:0;color:{TEXT_DIM};font-size:11px;line-height:1.65;">{footer_html}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
