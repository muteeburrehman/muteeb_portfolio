"""Super-user gate for internal admin API."""

from __future__ import annotations

import os

from services.super_user_store import verify_super_user


def _admin_key() -> str:
    return os.getenv("BOOKING_ADMIN_KEY", "").strip()


def _env_super_emails() -> frozenset[str]:
    raw = os.getenv("ADMIN_SUPER_EMAILS", "").strip()
    if not raw:
        return frozenset()
    return frozenset(part.strip().lower() for part in raw.split(",") if part.strip())


def verify_admin(*, email: str, key: str) -> bool:
    """`key` is the super-user password (or legacy BOOKING_ADMIN_KEY)."""
    normalized = email.strip().lower()
    password = key.strip()
    if not normalized or not password:
        return False

    if verify_super_user(email=normalized, password=password):
        return True

    # Legacy env-based access (stats curl, automation)
    allowed = _env_super_emails()
    expected_key = _admin_key()
    if expected_key and allowed:
        return password == expected_key and normalized in allowed
    return False
