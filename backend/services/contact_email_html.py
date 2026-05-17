"""
Branded HTML for Muteeb Labs portfolio contact notifications.

Dark theme aligned with the site: #070707 base, sky→purple accent gradient.
Table layout + inline CSS for Gmail/Outlook compatibility.
"""

from __future__ import annotations

import html

from schemas.contact import ContactSubmission
from services.contact_urls import public_contact_form_url

# Site palette (matches src/index.css)
_BG_OUTER = "#0a0a0a"
_CARD = "#161616"
_CARD_BORDER = "#2a2a2a"
_TEXT = "#f5f5f5"
_TEXT_MUTED = "#a3a3a3"
_TEXT_DIM = "#737373"
_SKY = "#38bdf8"
_PURPLE = "#a855f7"
_ACCENT_BAR = f"linear-gradient(90deg,{_SKY},{_PURPLE})"
_BRAND = "Muteeb Labs"


def _topic_label(data: ContactSubmission) -> str | None:
    return (data.topic or data.service or "").strip() or None


def render_contact_notification_html(data: ContactSubmission) -> str:
    def esc(v: object) -> str:
        return html.escape(str(v), quote=False)

    def meta_row(label: str, value: str | None) -> str:
        if not value or not str(value).strip():
            return ""
        return (
            "<tr>"
            f'<td width="128" valign="top" style="width:128px;padding:10px 12px 10px 0;'
            f"border-bottom:1px solid {_CARD_BORDER};vertical-align:top;\">"
            f'<p style="margin:0;color:{_TEXT_DIM};font-size:11px;font-weight:600;'
            f'letter-spacing:0.08em;text-transform:uppercase;">{esc(label)}</p>'
            "</td>"
            f'<td valign="top" style="padding:10px 0;border-bottom:1px solid {_CARD_BORDER};">'
            f'<p style="margin:0;color:{_TEXT};font-size:15px;line-height:1.5;font-weight:500;">'
            f"{esc(value)}</p>"
            "</td>"
            "</tr>"
        )

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
    snippet = html.escape(
        raw_snippet[:120] + ("…" if len(raw_snippet) > 120 else ""),
        quote=False,
    )

    form_url = public_contact_form_url()
    form_href = html.escape(form_url, quote=True)
    form_label = html.escape(form_url)

    return f"""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>New inquiry — {_BRAND}</title>
</head>
<body style="margin:0;padding:0;background:{_BG_OUTER};
 font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;font-size:1px;color:{_BG_OUTER};line-height:1px;max-height:0;opacity:0;overflow:hidden;mso-hide:all;">
    New message from {esc(data.name)} — {snippet}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:{_BG_OUTER};padding:32px 16px 48px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;">

          <!-- Header gradient -->
          <tr>
            <td style="border-radius:16px 16px 0 0;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:{_SKY};background:linear-gradient(125deg,{_SKY} 0%,{_PURPLE} 100%);
                    padding:28px 28px 30px;">
                    <p style="margin:0 0 6px;color:rgba(255,255,255,0.85);font-size:10px;font-weight:700;
                      letter-spacing:0.28em;text-transform:uppercase;">{_BRAND.upper()}</p>
                    <p style="margin:0;color:#ffffff;font-size:24px;font-weight:800;line-height:1.15;
                      font-family:Georgia,'Times New Roman',serif;">New portfolio inquiry</p>
                    <p style="margin:14px 0 0;color:rgba(255,255,255,0.92);font-size:14px;line-height:1.5;">
                      Hit <strong>Reply</strong> in your mail app — we set the visitor&apos;s address for you.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card body -->
          <tr>
            <td style="background:{_CARD};padding:0 26px 28px;border:1px solid {_CARD_BORDER};
              border-top:none;border-radius:0 0 16px 16px;">

              <p style="margin:0;padding:22px 0 16px;color:{_TEXT_MUTED};font-size:15px;line-height:1.6;">
                Someone submitted your contact form. Summary below.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 20px;">
                <tr>
                  <td style="height:3px;background:{_SKY};background:{_ACCENT_BAR};border-radius:2px;font-size:0;">&#8203;</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">{rows}</table>

              <p style="margin:24px 0 10px;color:{_TEXT_DIM};font-size:10px;font-weight:700;
                letter-spacing:0.14em;text-transform:uppercase;">Message</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:14px 16px;background:#0f0f0f;border:1px solid {_CARD_BORDER};
                    border-left:4px solid {_SKY};border-radius:0 12px 12px 0;">
                    <div style="margin:0;color:{_TEXT};font-size:15px;line-height:1.6;">{message_block}</div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;">
                <tr>
                  <td style="padding:14px 16px;background:#0f0f0f;border:1px solid {_CARD_BORDER};border-radius:10px;">
                    <p style="margin:0 0 10px;color:{_TEXT_DIM};font-size:10px;font-weight:700;
                      letter-spacing:0.1em;text-transform:uppercase;">Source</p>
                    <a href="{form_href}" target="_blank" rel="noopener noreferrer"
                      style="display:inline-block;padding:10px 18px;font-size:13px;font-weight:600;
                      color:#ffffff;text-decoration:none;border-radius:8px;
                      background:linear-gradient(135deg,{_SKY},{_PURPLE});">Open contact page</a>
                    <p style="margin:12px 0 0;color:{_TEXT_DIM};font-size:12px;line-height:1.45;word-break:break-all;">
                      {form_label}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 8px 0;text-align:center;">
              <p style="margin:0;color:{_TEXT_DIM};font-size:12px;line-height:1.65;">
                Sent by <strong style="color:{_TEXT_MUTED};">{_BRAND}</strong> contact pipeline<br/>
                <span style="font-size:11px;">Internal notification — do not forward</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
