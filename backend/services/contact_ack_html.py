"""
Branded HTML for the auto-acknowledgment email sent to the client after
they submit the portfolio contact form. Same dark theme as the admin
notification, but written as a warm "thanks for reaching out" message.

Table layout + inline CSS for Gmail / Outlook compatibility.
"""

from __future__ import annotations

import html
import os

from schemas.contact import ContactSubmission

_BG_OUTER = "#0a0a0a"
_CARD = "#161616"
_CARD_BORDER = "#2a2a2a"
_TEXT = "#f5f5f5"
_TEXT_MUTED = "#a3a3a3"
_TEXT_DIM = "#737373"
_SKY = "#38bdf8"
_PURPLE = "#a855f7"
_ACCENT_BAR = f"linear-gradient(90deg,{_SKY},{_PURPLE})"

_BRAND = os.getenv("MAIL_BRAND_NAME", "Muteeb Labs")
_SIGN_NAME = os.getenv("MAIL_SIGN_NAME", "Muteeb Ur Rehman")
_SIGN_TITLE = os.getenv("MAIL_SIGN_TITLE", "Full Stack Developer & AI Engineer")
_SITE_URL = (os.getenv("PUBLIC_SITE_URL") or "https://muteeblabs.com").rstrip("/")
_REPLY_WINDOW = os.getenv("MAIL_REPLY_WINDOW", "usually within one day")
_CONTACT_EMAIL = (
    os.getenv("EMAIL_FROM") or os.getenv("EMAIL_TO") or "info@muteeblabs.com"
).strip()


def _topic_label(data: ContactSubmission) -> str | None:
    return (data.topic or data.service or "").strip() or None


def render_contact_acknowledgment_html(data: ContactSubmission) -> str:
    def esc(v: object) -> str:
        return html.escape(str(v), quote=False)

    first_name = (data.name or "").strip().split()[0] if data.name else "there"
    topic = _topic_label(data)
    topic_line = (
        f"<p style=\"margin:18px 0 0;color:{_TEXT_DIM};font-size:13px;line-height:1.55;\">"
        f"Project type: <span style=\"color:{_TEXT_MUTED};font-weight:500;\">{esc(topic)}</span></p>"
        if topic
        else ""
    )

    message_block = esc(data.message).replace("\r\n", "\n").replace("\n", "<br />\n")

    site_href = html.escape(_SITE_URL, quote=True)
    site_label = html.escape(_SITE_URL.replace("https://", "").replace("http://", ""))
    contact_mail = html.escape(_CONTACT_EMAIL, quote=True)
    contact_mail_label = html.escape(_CONTACT_EMAIL)

    return f"""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>Message received — {_BRAND}</title>
</head>
<body style="margin:0;padding:0;background:{_BG_OUTER};
 font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;font-size:1px;color:{_BG_OUTER};line-height:1px;max-height:0;opacity:0;overflow:hidden;mso-hide:all;">
    Automated confirmation — your message was received. Personal reply {esc(_REPLY_WINDOW)}.
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
                      font-family:Georgia,'Times New Roman',serif;">
                      We received your message</p>
                    <p style="margin:14px 0 0;color:rgba(255,255,255,0.92);font-size:14px;line-height:1.55;">
                      Hi {esc(first_name)} — this is an <strong>automated confirmation</strong>, not a personal reply yet.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background:{_CARD};padding:0 26px 28px;border:1px solid {_CARD_BORDER};
              border-top:none;border-radius:0 0 16px 16px;">

              <!-- Transparency notice (Hetzner-style) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0 0;">
                <tr>
                  <td style="padding:14px 16px;background:#0f0f0f;border:1px solid {_CARD_BORDER};
                    border-radius:10px;">
                    <p style="margin:0 0 8px;color:{_TEXT_DIM};font-size:10px;font-weight:700;
                      letter-spacing:0.12em;text-transform:uppercase;">Automated message</p>
                    <p style="margin:0;color:{_TEXT_MUTED};font-size:13px;line-height:1.65;">
                      You are probably aware by now that this email is sent automatically — it is
                      <strong style="color:{_TEXT};font-weight:600;">not</strong> a reply to your inquiry.
                      Your message was delivered successfully. {_SIGN_NAME} will email you personally
                      {esc(_REPLY_WINDOW)} after reviewing what you sent.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:18px 0 0;color:{_TEXT_MUTED};font-size:14px;line-height:1.65;">
                A copy of your submission is below for your records. If anything looks wrong, reply to
                this email or write to
                <a href="mailto:{contact_mail}" style="color:{_SKY};text-decoration:none;">{contact_mail_label}</a>.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0 12px;">
                <tr>
                  <td style="height:3px;background:{_SKY};background:{_ACCENT_BAR};border-radius:2px;font-size:0;">&#8203;</td>
                </tr>
              </table>

              <p style="margin:14px 0 8px;color:{_TEXT_DIM};font-size:10px;font-weight:700;
                letter-spacing:0.14em;text-transform:uppercase;">Your message</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:14px 16px;background:#0f0f0f;border:1px solid {_CARD_BORDER};
                    border-left:4px solid {_SKY};border-radius:0 12px 12px 0;">
                    <div style="margin:0;color:{_TEXT};font-size:15px;line-height:1.6;">{message_block}</div>
                  </td>
                </tr>
              </table>
              {topic_line}

              <!-- Signature -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:32px;">
                <tr>
                  <td style="padding-top:18px;border-top:1px solid {_CARD_BORDER};">
                    <p style="margin:0;color:{_TEXT};font-size:14px;line-height:1.5;font-weight:600;">{_SIGN_NAME}</p>
                    <p style="margin:2px 0 0;color:{_TEXT_DIM};font-size:12px;line-height:1.5;">{_SIGN_TITLE}</p>
                    <p style="margin:6px 0 0;color:{_TEXT_DIM};font-size:12px;line-height:1.5;">
                      <a href="{site_href}" target="_blank" rel="noopener noreferrer"
                        style="color:{_SKY};text-decoration:none;">{site_label}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 8px 0;text-align:center;">
              <p style="margin:0;color:{_TEXT_DIM};font-size:11px;line-height:1.65;">
                <strong style="color:{_TEXT_MUTED};font-weight:600;">Automated notification</strong> from the
                contact form at
                <a href="{site_href}" style="color:{_TEXT_MUTED};text-decoration:none;">{site_label}</a>.<br/>
                No action required on this email. If you did not submit the form, you can ignore it.
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
