"""Super-user accounts for /admin (hashed passwords in SQLite)."""

from __future__ import annotations

import hashlib
import logging
import secrets
from dataclasses import dataclass
from datetime import datetime, timezone

from services.app_db import connect

logger = logging.getLogger(__name__)

_PBKDF2_ITERATIONS = 600_000


@dataclass(frozen=True)
class SuperUser:
    email: str
    created_at: datetime


def _hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        _PBKDF2_ITERATIONS,
    )
    return f"pbkdf2_sha256${_PBKDF2_ITERATIONS}${salt}${digest.hex()}"


def _verify_password(password: str, stored: str) -> bool:
    try:
        algo, iterations, salt, digest_hex = stored.split("$", 3)
        if algo != "pbkdf2_sha256":
            return False
        expected = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            int(iterations),
        ).hex()
        return secrets.compare_digest(expected, digest_hex)
    except (ValueError, TypeError):
        return False


def ensure_super_users_schema(conn) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS super_users (
            email TEXT PRIMARY KEY,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )


def init_super_users_db() -> None:
    with connect() as conn:
        ensure_super_users_schema(conn)
        conn.commit()


def upsert_super_user(*, email: str, password: str) -> SuperUser:
    normalized = email.strip().lower()
    if not normalized or not password:
        raise ValueError("Email and password are required.")
    created_at = datetime.now(timezone.utc)
    password_hash = _hash_password(password)

    with connect() as conn:
        ensure_super_users_schema(conn)
        existing = conn.execute(
            "SELECT created_at FROM super_users WHERE email = ?",
            (normalized,),
        ).fetchone()
        if existing:
            conn.execute(
                "UPDATE super_users SET password_hash = ? WHERE email = ?",
                (password_hash, normalized),
            )
            created_at = datetime.fromisoformat(existing["created_at"])
            if created_at.tzinfo is None:
                created_at = created_at.replace(tzinfo=timezone.utc)
            logger.info("Super-user password updated: %s", normalized)
        else:
            conn.execute(
                """
                INSERT INTO super_users (email, password_hash, created_at)
                VALUES (?, ?, ?)
                """,
                (normalized, password_hash, created_at.isoformat()),
            )
            logger.info("Super-user created: %s", normalized)
        conn.commit()

    return SuperUser(email=normalized, created_at=created_at)


def verify_super_user(*, email: str, password: str) -> bool:
    normalized = email.strip().lower()
    with connect() as conn:
        ensure_super_users_schema(conn)
        row = conn.execute(
            "SELECT password_hash FROM super_users WHERE email = ?",
            (normalized,),
        ).fetchone()
    if not row:
        return False
    return _verify_password(password, row["password_hash"])
