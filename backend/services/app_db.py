"""Shared SQLite connection for funnel data (bookings + contacts)."""

from __future__ import annotations

import os
import sqlite3
from pathlib import Path


def db_path() -> Path:
    raw = os.getenv("BOOKING_DB_PATH", "").strip()
    if raw:
        return Path(raw)
    return Path(__file__).resolve().parent.parent / "data" / "bookings.sqlite"


def connect() -> sqlite3.Connection:
    path = db_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn
