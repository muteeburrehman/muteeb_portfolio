"""Build multipart emails with optional inline logo (CID)."""

from __future__ import annotations

from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from services.mail_assets import LOGO_CID, logo_path


def attach_branded_html(
    mime: MIMEMultipart,
    *,
    plain_body: str,
    html_body: str,
) -> None:
    """Attach plain + HTML parts and inline logo when available."""
    alternative = MIMEMultipart("alternative")
    alternative.attach(MIMEText(plain_body, "plain", "utf-8"))
    alternative.attach(MIMEText(html_body, "html", "utf-8"))
    mime.attach(alternative)

    path = logo_path()
    if not path:
        return

    with path.open("rb") as handle:
        image = MIMEImage(handle.read(), _subtype="png")
    image.add_header("Content-ID", f"<{LOGO_CID}>")
    image.add_header("Content-Disposition", "inline", filename="logo.png")
    mime.attach(image)
