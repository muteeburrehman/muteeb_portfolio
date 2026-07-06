"""Meeting link for booked calls (Zoom static room, Google Meet URL, or placeholder)."""

from __future__ import annotations

import os


def get_meeting_link() -> tuple[str, str]:
    """
    Returns (meeting_link, provider_label).
    Set MEETING_LINK in .env to your recurring Zoom or Google Meet URL.
    """
    link = (os.getenv("MEETING_LINK") or os.getenv("ZOOM_MEETING_URL") or "").strip()
    provider = (os.getenv("MEETING_PROVIDER") or "zoom").strip().lower()

    if link:
        label = "Google Meet" if "meet.google" in link else "Zoom"
        return link, label

    site = (os.getenv("PUBLIC_SITE_URL") or "https://muteeblabs.uk").rstrip("/")
    return (
        f"{site}/contact",
        "Email follow-up",
    )
