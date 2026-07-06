"""Funnel analytics for admin charts (daily series + totals)."""

from __future__ import annotations

from datetime import date, datetime, timedelta, timezone

from services.app_db import connect


def _date_keys(days: int) -> list[str]:
    today = datetime.now(timezone.utc).date()
    return [(today - timedelta(days=offset)).isoformat() for offset in range(days - 1, -1, -1)]


def _counts_by_day(
    table: str,
    date_column: str,
    since: date,
    *,
    status: str | None = None,
    extra_where: str = "",
) -> dict[str, int]:
    query = f"""
        SELECT substr({date_column}, 1, 10) AS day, COUNT(*) AS c
        FROM {table}
        WHERE {date_column} >= ?
    """
    params: list[object] = [since.isoformat()]
    if status:
        query += " AND status = ?"
        params.append(status)
    if extra_where:
        query += f" AND {extra_where}"
    query += " GROUP BY day"

    with connect() as conn:
        rows = conn.execute(query, params).fetchall()
    return {row["day"]: int(row["c"]) for row in rows}


def _series(keys: list[str], counts: dict[str, int]) -> list[int]:
    return [counts.get(key, 0) for key in keys]


def funnel_daily_analytics(*, days: int = 14) -> dict[str, object]:
    days = max(7, min(days, 30))
    keys = _date_keys(days)
    since = date.fromisoformat(keys[0])

    contacts = _counts_by_day("contacts", "created_at", since)
    replied = _counts_by_day("contacts", "replied_at", since, extra_where="replied_at IS NOT NULL")
    bookings_all = _counts_by_day("bookings", "created_at", since)
    bookings_confirmed = _counts_by_day("bookings", "created_at", since, status="confirmed")
    bookings_cancelled = _counts_by_day("bookings", "created_at", since, status="cancelled")

    contacts_per_day = _series(keys, contacts)
    contacts_replied_per_day = _series(keys, replied)
    bookings_per_day = _series(keys, bookings_all)
    bookings_confirmed_per_day = _series(keys, bookings_confirmed)
    bookings_cancelled_per_day = _series(keys, bookings_cancelled)

    return {
        "days": days,
        "labels": keys,
        "contacts_per_day": contacts_per_day,
        "contacts_replied_per_day": contacts_replied_per_day,
        "bookings_per_day": bookings_per_day,
        "bookings_confirmed_per_day": bookings_confirmed_per_day,
        "bookings_cancelled_per_day": bookings_cancelled_per_day,
        "totals": {
            "contacts": sum(contacts_per_day),
            "contacts_replied": sum(contacts_replied_per_day),
            "bookings": sum(bookings_per_day),
            "bookings_confirmed": sum(bookings_confirmed_per_day),
            "bookings_cancelled": sum(bookings_cancelled_per_day),
        },
    }
