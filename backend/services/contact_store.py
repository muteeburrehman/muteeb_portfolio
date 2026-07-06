"""SQLite persistence for contact form submissions."""

from __future__ import annotations

import logging
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone

from schemas.contact import ContactSubmission
from services.app_db import connect

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class ContactRecord:
    id: str
    name: str
    email: str
    message: str
    topic: str | None
    service: str | None
    company: str | None
    phone: str | None
    created_at: datetime
    replied_at: datetime | None


def _parse_dt(value: str | None) -> datetime | None:
    if not value:
        return None
    dt = datetime.fromisoformat(value)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


def _row_to_record(row) -> ContactRecord:
    return ContactRecord(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        message=row["message"],
        topic=row["topic"],
        service=row["service"],
        company=row["company"],
        phone=row["phone"],
        created_at=_parse_dt(row["created_at"]) or datetime.now(timezone.utc),
        replied_at=_parse_dt(row["replied_at"]),
    )


def ensure_contacts_schema(conn) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS contacts (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            topic TEXT,
            service TEXT,
            company TEXT,
            phone TEXT,
            created_at TEXT NOT NULL,
            replied_at TEXT
        )
        """
    )
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC)"
    )
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_contacts_replied_at ON contacts(replied_at)"
    )


def init_contacts_db() -> None:
    with connect() as conn:
        ensure_contacts_schema(conn)
        conn.commit()


def insert_contact(data: ContactSubmission) -> ContactRecord:
    record_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc)
    with connect() as conn:
        ensure_contacts_schema(conn)
        conn.execute(
            """
            INSERT INTO contacts (
                id, name, email, message, topic, service, company, phone, created_at, replied_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
            """,
            (
                record_id,
                data.name,
                str(data.email).lower(),
                data.message,
                data.topic,
                data.service,
                data.company,
                data.phone,
                created_at.isoformat(),
            ),
        )
        conn.commit()
    logger.info("Contact saved: %s <%s>", record_id, data.email)
    return ContactRecord(
        id=record_id,
        name=data.name,
        email=str(data.email).lower(),
        message=data.message,
        topic=data.topic,
        service=data.service,
        company=data.company,
        phone=data.phone,
        created_at=created_at,
        replied_at=None,
    )


def list_contacts(*, status: str = "all", limit: int = 500) -> list[ContactRecord]:
    query = "SELECT * FROM contacts"
    params: list[object] = []
    if status == "pending":
        query += " WHERE replied_at IS NULL"
    elif status == "replied":
        query += " WHERE replied_at IS NOT NULL"
    query += " ORDER BY created_at DESC LIMIT ?"
    params.append(limit)

    with connect() as conn:
        ensure_contacts_schema(conn)
        rows = conn.execute(query, params).fetchall()
    return [_row_to_record(row) for row in rows]


def get_contact(contact_id: str) -> ContactRecord | None:
    with connect() as conn:
        ensure_contacts_schema(conn)
        row = conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,)).fetchone()
    if not row:
        return None
    return _row_to_record(row)


def mark_contact_replied(contact_id: str) -> ContactRecord | None:
    replied_at = datetime.now(timezone.utc)
    with connect() as conn:
        ensure_contacts_schema(conn)
        row = conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,)).fetchone()
        if not row:
            return None
        conn.execute(
            "UPDATE contacts SET replied_at = ? WHERE id = ?",
            (replied_at.isoformat(), contact_id),
        )
        conn.commit()
    record = _row_to_record(row)
    return ContactRecord(
        id=record.id,
        name=record.name,
        email=record.email,
        message=record.message,
        topic=record.topic,
        service=record.service,
        company=record.company,
        phone=record.phone,
        created_at=record.created_at,
        replied_at=replied_at,
    )


def contact_counts() -> dict[str, int]:
    with connect() as conn:
        ensure_contacts_schema(conn)
        row = conn.execute(
            """
            SELECT
                COUNT(*) AS total,
                SUM(CASE WHEN replied_at IS NULL THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN replied_at IS NOT NULL THEN 1 ELSE 0 END) AS replied
            FROM contacts
            """
        ).fetchone()
    return {
        "total": int(row["total"] or 0),
        "pending": int(row["pending"] or 0),
        "replied": int(row["replied"] or 0),
    }
