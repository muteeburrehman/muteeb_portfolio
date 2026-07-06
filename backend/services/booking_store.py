"""SQLite persistence for discovery-call bookings."""

from __future__ import annotations

import logging
import secrets
import sqlite3
import uuid
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from services.app_db import connect, db_path

logger = logging.getLogger(__name__)


@dataclass
class BookingRecord:
    id: str
    name: str
    email: str
    company: str | None
    phone: str | None
    notes: str | None
    source: str | None
    starts_at: datetime
    ends_at: datetime
    meeting_link: str
    hubspot_contact_id: str | None
    hubspot_deal_id: str | None
    cancel_token: str
    status: str
    created_at: datetime


def _connect() -> sqlite3.Connection:
    return connect()


def _db_path() -> str:
    return str(db_path())


def _ensure_schema(conn: sqlite3.Connection) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            phone TEXT,
            notes TEXT,
            source TEXT,
            starts_at TEXT NOT NULL,
            ends_at TEXT NOT NULL,
            meeting_link TEXT NOT NULL,
            hubspot_contact_id TEXT,
            hubspot_deal_id TEXT,
            status TEXT NOT NULL DEFAULT 'confirmed',
            cancel_token TEXT,
            created_at TEXT NOT NULL
        )
        """
    )
    cols = {row[1] for row in conn.execute("PRAGMA table_info(bookings)").fetchall()}
    if "cancel_token" not in cols:
        conn.execute("ALTER TABLE bookings ADD COLUMN cancel_token TEXT")
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_bookings_starts_at ON bookings(starts_at)"
    )
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_bookings_cancel_token ON bookings(cancel_token)"
    )


def init_db() -> None:
    with _connect() as conn:
        _ensure_schema(conn)
        conn.commit()
    logger.info("Booking database ready at %s", _db_path())


def _parse_dt(value: str) -> datetime:
    dt = datetime.fromisoformat(value)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


def _row_to_record(row: sqlite3.Row) -> BookingRecord:
    return BookingRecord(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        company=row["company"],
        phone=row["phone"],
        notes=row["notes"],
        source=row["source"],
        starts_at=_parse_dt(row["starts_at"]),
        ends_at=_parse_dt(row["ends_at"]),
        meeting_link=row["meeting_link"],
        hubspot_contact_id=row["hubspot_contact_id"],
        hubspot_deal_id=row["hubspot_deal_id"],
        cancel_token=row["cancel_token"] or "",
        status=row["status"],
        created_at=_parse_dt(row["created_at"]),
    )


def _has_overlap(
    conn: sqlite3.Connection,
    start: datetime,
    end: datetime,
    *,
    exclude_booking_id: str | None = None,
) -> bool:
    query = """
        SELECT 1 FROM bookings
        WHERE status = 'confirmed'
          AND starts_at < ?
          AND ends_at > ?
    """
    params: list[str] = [end.isoformat(), start.isoformat()]
    if exclude_booking_id:
        query += " AND id != ?"
        params.append(exclude_booking_id)
    row = conn.execute(query, params).fetchone()
    return row is not None


def list_booked_ranges(
    range_start: datetime | None = None,
    range_end: datetime | None = None,
) -> list[tuple[datetime, datetime]]:
    query = "SELECT starts_at, ends_at FROM bookings WHERE status = 'confirmed'"
    params: list[str] = []
    if range_start is not None:
        query += " AND ends_at > ?"
        params.append(range_start.isoformat())
    if range_end is not None:
        query += " AND starts_at < ?"
        params.append(range_end.isoformat())

    with _connect() as conn:
        rows = conn.execute(query, params).fetchall()

    return [(_parse_dt(r["starts_at"]), _parse_dt(r["ends_at"])) for r in rows]


def insert_booking(
    *,
    name: str,
    email: str,
    company: str | None,
    phone: str | None,
    notes: str | None,
    source: str | None,
    starts_at: datetime,
    ends_at: datetime,
    meeting_link: str,
    hubspot_contact_id: str | None = None,
    hubspot_deal_id: str | None = None,
) -> BookingRecord:
    """Insert only if the slot is still free (transactional)."""
    booking_id = str(uuid.uuid4())
    cancel_token = secrets.token_urlsafe(32)
    created_at = datetime.now(timezone.utc)

    with _connect() as conn:
        _ensure_schema(conn)
        conn.execute("BEGIN IMMEDIATE")
        if _has_overlap(conn, starts_at, ends_at):
            conn.rollback()
            raise ValueError("That time slot is no longer available. Please pick another.")
        conn.execute(
            """
            INSERT INTO bookings (
                id, name, email, company, phone, notes, source,
                starts_at, ends_at, meeting_link,
                hubspot_contact_id, hubspot_deal_id, status, cancel_token, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?, ?)
            """,
            (
                booking_id,
                name,
                email.lower(),
                company,
                phone,
                notes,
                source,
                starts_at.isoformat(),
                ends_at.isoformat(),
                meeting_link,
                hubspot_contact_id,
                hubspot_deal_id,
                cancel_token,
                created_at.isoformat(),
            ),
        )
        conn.commit()

    return BookingRecord(
        id=booking_id,
        name=name,
        email=email,
        company=company,
        phone=phone,
        notes=notes,
        source=source,
        starts_at=starts_at,
        ends_at=ends_at,
        meeting_link=meeting_link,
        hubspot_contact_id=hubspot_contact_id,
        hubspot_deal_id=hubspot_deal_id,
        cancel_token=cancel_token,
        status="confirmed",
        created_at=created_at,
    )


def get_booking(booking_id: str) -> BookingRecord | None:
    with _connect() as conn:
        row = conn.execute("SELECT * FROM bookings WHERE id = ?", (booking_id,)).fetchone()
    if not row:
        return None
    return _row_to_record(row)


def get_booking_by_token(cancel_token: str) -> BookingRecord | None:
    with _connect() as conn:
        row = conn.execute(
            "SELECT * FROM bookings WHERE cancel_token = ?",
            (cancel_token.strip(),),
        ).fetchone()
    if not row:
        return None
    return _row_to_record(row)


def admin_cancel_booking(booking_id: str) -> BookingRecord:
    """Cancel by id (admin) — skips client-only restrictions; still frees the slot."""
    with _connect() as conn:
        _ensure_schema(conn)
        row = conn.execute("SELECT * FROM bookings WHERE id = ?", (booking_id.strip(),)).fetchone()
        if not row:
            raise LookupError("Booking not found.")

        record = _row_to_record(row)
        if record.status == "cancelled":
            raise ValueError("This booking was already cancelled.")

        conn.execute(
            "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
            (record.id,),
        )
        conn.commit()

    record.status = "cancelled"
    logger.info("Booking cancelled by admin: %s", record.id)
    return record


def delete_booking(booking_id: str) -> None:
    """Permanently remove a booking record (frees the slot). No client email."""
    with _connect() as conn:
        _ensure_schema(conn)
        cur = conn.execute("DELETE FROM bookings WHERE id = ?", (booking_id.strip(),))
        if cur.rowcount == 0:
            raise LookupError("Booking not found.")
        conn.commit()
    logger.info("Booking deleted by admin: %s", booking_id.strip())


def cancel_booking(*, booking_id: str | None = None, cancel_token: str | None = None, email: str | None = None) -> BookingRecord:
    with _connect() as conn:
        _ensure_schema(conn)
        if cancel_token:
            row = conn.execute(
                "SELECT * FROM bookings WHERE cancel_token = ?",
                (cancel_token.strip(),),
            ).fetchone()
        elif booking_id and email:
            row = conn.execute(
                "SELECT * FROM bookings WHERE id = ? AND email = ?",
                (booking_id.strip(), email.strip().lower()),
            ).fetchone()
        else:
            raise ValueError("Provide cancel token or booking id with email.")

        if not row:
            raise LookupError("Booking not found or email does not match.")

        record = _row_to_record(row)
        if record.status == "cancelled":
            raise ValueError("This booking was already cancelled.")

        if record.starts_at <= datetime.now(timezone.utc):
            raise ValueError("Past bookings cannot be cancelled online. Please email us.")

        conn.execute(
            "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
            (record.id,),
        )
        conn.commit()

    record.status = "cancelled"
    logger.info("Booking cancelled: %s", record.id)
    return record


def funnel_stats() -> dict[str, int]:
    counts = booking_counts()
    return {
        "total_bookings": counts["confirmed"],
        "upcoming_bookings": counts["upcoming"],
        "bookings_last_30_days": counts["last_30_days"],
    }


def booking_counts() -> dict[str, int]:
    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)

    with _connect() as conn:
        rows = conn.execute(
            "SELECT status, starts_at, created_at FROM bookings"
        ).fetchall()

    confirmed = cancelled = upcoming = last_30_days = 0
    for row in rows:
        status = row["status"]
        created_at = _parse_dt(row["created_at"])
        if status == "confirmed":
            confirmed += 1
            starts_at = _parse_dt(row["starts_at"])
            if starts_at >= now:
                upcoming += 1
            if created_at >= thirty_days_ago:
                last_30_days += 1
        elif status == "cancelled":
            cancelled += 1

    return {
        "confirmed": confirmed,
        "cancelled": cancelled,
        "upcoming": upcoming,
        "last_30_days": last_30_days,
    }


def list_bookings(*, status: str = "all", limit: int = 500) -> list[BookingRecord]:
    query = "SELECT * FROM bookings"
    params: list[object] = []
    if status == "confirmed":
        query += " WHERE status = 'confirmed'"
    elif status == "cancelled":
        query += " WHERE status = 'cancelled'"
    query += " ORDER BY starts_at DESC LIMIT ?"
    params.append(limit)

    with _connect() as conn:
        rows = conn.execute(query, params).fetchall()
    return [_row_to_record(row) for row in rows]
