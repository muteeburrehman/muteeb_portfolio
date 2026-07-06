"""Shared MuteebLabs branded email layout — matches site theme (navy + blue/green)."""

from __future__ import annotations

import html
import os

from services.mail_assets import logo_cid_src

# Site palette (src/index.css)
BG_OUTER = "#040810"
BG_NAVY = "#0a1220"
CARD = "#0c1526"
CARD_BORDER = "rgba(51, 65, 85, 0.65)"
TEXT = "#f1f5f9"
TEXT_MUTED = "#94a3b8"
TEXT_DIM = "#64748b"
PRIMARY = "#0ea5e9"
ACCENT = "#22c55e"
ACCENT_BAR = f"linear-gradient(135deg,{PRIMARY} 0%,{ACCENT} 100%)"

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


def logo_block() -> str:
    return (
        f'<img src="{logo_cid_src()}" width="148" height="auto" alt="{esc(BRAND)}" '
        f'style="display:block;max-width:148px;height:auto;border:0;outline:none;" />'
    )


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
        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 20px;">'
        f"<tr><td style=\"height:3px;background:{PRIMARY};background:{ACCENT_BAR};"
        f'border-radius:2px;font-size:0;">&#8203;</td></tr></table>'
    )


def cta_button(href: str, label: str) -> str:
    return (
        f'<a href="{esc_attr(href)}" target="_blank" rel="noopener noreferrer" '
        f'style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;'
        f"color:#ffffff;text-decoration:none;border-radius:14px;"
        f'background:{PRIMARY};background:{ACCENT_BAR};">{esc(label)}</a>'
    )


def secondary_link(href: str, label: str) -> str:
    return (
        f'<a href="{esc_attr(href)}" style="color:{PRIMARY};text-decoration:none;'
        f'font-weight:500;">{esc(label)}</a>'
    )


def signature_block() -> str:
    site_href = esc_attr(SITE_URL)
    site_lbl = esc(site_label())
    return (
        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;">'
        f"<tr><td style=\"padding-top:18px;border-top:1px solid {CARD_BORDER};\">"
        f'<p style="margin:0;color:{TEXT};font-size:14px;line-height:1.5;font-weight:600;">{esc(SIGN_NAME)}</p>'
        f'<p style="margin:2px 0 0;color:{TEXT_DIM};font-size:12px;line-height:1.5;">{esc(SIGN_TITLE)}</p>'
        f'<p style="margin:6px 0 0;color:{TEXT_DIM};font-size:12px;line-height:1.5;">'
        f'<a href="{site_href}" target="_blank" rel="noopener noreferrer" '
        f'style="color:{PRIMARY};text-decoration:none;">{site_lbl}</a></p>'
        "</td></tr></table>"
    )


def info_box(title: str, body_html: str) -> str:
    return (
        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:18px 0 0;">'
        f"<tr><td style=\"padding:14px 16px;background:{BG_NAVY};border:1px solid {CARD_BORDER};"
        f'border-radius:14px;">'
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
        f'<p style="margin:12px 0 0;color:rgba(255,255,255,0.88);font-size:10px;font-weight:700;'
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
 font-family:'Inter','Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;font-size:1px;color:{BG_OUTER};line-height:1px;max-height:0;opacity:0;overflow:hidden;mso-hide:all;">
    {esc(preview_text)}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:{BG_OUTER};padding:32px 16px 48px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;">

          <tr>
            <td style="border-radius:18px 18px 0 0;overflow:hidden;border:1px solid {CARD_BORDER};border-bottom:none;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:{BG_NAVY};padding:22px 28px 8px;text-align:center;">
                    {logo_block()}
                  </td>
                </tr>
                <tr>
                  <td style="background:{PRIMARY};background:{ACCENT_BAR};padding:8px 28px 28px;">
                    {eyebrow}
                    <p style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.15;
                      font-family:'Oswald','Inter','Segoe UI',sans-serif;letter-spacing:0.02em;">
                      {esc(header_title)}</p>
                    <p style="margin:14px 0 0;color:rgba(255,255,255,0.94);font-size:14px;line-height:1.55;">
                      {header_subtitle}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:{CARD};padding:0 26px 28px;border:1px solid {CARD_BORDER};
              border-top:none;border-radius:0 0 18px 18px;">
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
