"""Public URLs surfaced in outbound mail."""

from __future__ import annotations

import os


def public_contact_form_url() -> str:
    raw = os.getenv("PUBLIC_SITE_URL") or "https://muteeblabs.com"
    base = raw.strip().rstrip("/")
    return f"{base}/contact"
