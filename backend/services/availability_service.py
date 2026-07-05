"""Load weekly hours / blocks and compute open booking slots."""

from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass
from datetime import date, datetime, time, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

logger = logging.getLogger(__name__)

WEEKDAY_KEYS = (
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
)


@dataclass(frozen=True)
class TimeWindow:
    start: time
    end: time


@dataclass(frozen=True)
class AvailabilityRules:
    timezone: ZoneInfo
    slot_duration_minutes: int
    buffer_minutes: int
    min_notice_hours: int
    max_days_ahead: int
    weekly_hours: dict[str, list[TimeWindow]]
    blocked_dates: set[date]
    blocked_ranges: list[tuple[datetime, datetime]]


def _config_path() -> Path:
    custom = os.getenv("AVAILABILITY_CONFIG_PATH", "").strip()
    if custom:
        return Path(custom)
    return Path(__file__).resolve().parent.parent / "data" / "availability.json"


def _parse_time(value: str) -> time:
    hour, minute = value.split(":")
    return time(int(hour), int(minute))


def load_availability_rules() -> AvailabilityRules:
    path = _config_path()
    with path.open(encoding="utf-8") as f:
        raw = json.load(f)

    tz_name = os.getenv("BOOKING_TIMEZONE", raw.get("timezone", "Asia/Karachi"))
    tz = ZoneInfo(tz_name)

    weekly: dict[str, list[TimeWindow]] = {}
    for day in WEEKDAY_KEYS:
        windows = []
        for block in raw.get("weekly_hours", {}).get(day, []):
            windows.append(
                TimeWindow(
                    start=_parse_time(block["start"]),
                    end=_parse_time(block["end"]),
                )
            )
        weekly[day] = windows

    blocked_dates = {date.fromisoformat(d) for d in raw.get("blocked_dates", [])}

    blocked_ranges: list[tuple[datetime, datetime]] = []
    for item in raw.get("blocked_ranges", []):
        start = datetime.fromisoformat(item["start"]).replace(tzinfo=tz)
        end = datetime.fromisoformat(item["end"]).replace(tzinfo=tz)
        blocked_ranges.append((start, end))

    return AvailabilityRules(
        timezone=tz,
        slot_duration_minutes=int(
            os.getenv("BOOKING_DURATION_MINUTES", raw.get("slot_duration_minutes", 30))
        ),
        buffer_minutes=int(os.getenv("BOOKING_BUFFER_MINUTES", raw.get("buffer_minutes", 15))),
        min_notice_hours=int(os.getenv("BOOKING_MIN_NOTICE_HOURS", raw.get("min_notice_hours", 24))),
        max_days_ahead=int(os.getenv("BOOKING_MAX_DAYS_AHEAD", raw.get("max_days_ahead", 21))),
        weekly_hours=weekly,
        blocked_dates=blocked_dates,
        blocked_ranges=blocked_ranges,
    )


def _day_key(d: date) -> str:
    return WEEKDAY_KEYS[d.weekday()]


def _is_blocked(rules: AvailabilityRules, start: datetime, end: datetime) -> bool:
    local_start = start.astimezone(rules.timezone)
    if local_start.date() in rules.blocked_dates:
        return True
    for block_start, block_end in rules.blocked_ranges:
        if start < block_end and end > block_start:
            return True
    return False


def _overlaps_existing(
    start: datetime,
    end: datetime,
    booked: list[tuple[datetime, datetime]],
) -> bool:
    for booked_start, booked_end in booked:
        if start < booked_end and end > booked_start:
            return True
    return False


def generate_slots(
    rules: AvailabilityRules,
    range_start: date,
    range_end: date,
    booked: list[tuple[datetime, datetime]],
) -> list[tuple[datetime, datetime]]:
    """Return UTC-aware (timezone-aware) slot start/end pairs."""
    now = datetime.now(tz=rules.timezone)
    earliest = now + timedelta(hours=rules.min_notice_hours)
    latest_date = (now.date() + timedelta(days=rules.max_days_ahead))
    if range_end > latest_date:
        range_end = latest_date

    slot_len = timedelta(minutes=rules.slot_duration_minutes)
    step = timedelta(minutes=rules.slot_duration_minutes + rules.buffer_minutes)
    slots: list[tuple[datetime, datetime]] = []

    day = range_start
    while day <= range_end:
        if day > latest_date:
            break
        if day in rules.blocked_dates:
            day += timedelta(days=1)
            continue

        windows = rules.weekly_hours.get(_day_key(day), [])
        for window in windows:
            cursor = datetime.combine(day, window.start, tzinfo=rules.timezone)
            window_end = datetime.combine(day, window.end, tzinfo=rules.timezone)

            while cursor + slot_len <= window_end:
                end = cursor + slot_len
                if cursor >= earliest and not _is_blocked(rules, cursor, end):
                    if not _overlaps_existing(cursor, end, booked):
                        slots.append((cursor, end))
                cursor += step

        day += timedelta(days=1)

    return slots


def format_slot_label(start: datetime, rules: AvailabilityRules) -> str:
    local = start.astimezone(rules.timezone)
    time_str = local.strftime("%I:%M %p").lstrip("0")
    tz_abbr = local.strftime("%Z").replace("_", " ")
    if not tz_abbr or tz_abbr.startswith("+") or tz_abbr.startswith("-"):
        tz_abbr = str(rules.timezone).split("/")[-1].replace("_", " ")
    return f"{time_str} {tz_abbr}"
