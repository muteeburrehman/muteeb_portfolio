"""Public booking URLs in emails and confirmations."""

from __future__ import annotations

import os


def public_site_base() -> str:
    return (os.getenv("PUBLIC_SITE_URL") or "https://dev.muteeblabs.uk").strip().rstrip("/")


def booking_cancel_url(cancel_token: str) -> str:
    return f"{public_site_base()}/book/cancel?token={cancel_token}"
