"""Booking / sales-funnel API models."""

from datetime import datetime

import re

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

_E164_RE = re.compile(r"^\+[1-9]\d{6,14}$")


class BookingConfigResponse(BaseModel):
    timezone: str
    slot_duration_minutes: int
    min_notice_hours: int
    max_days_ahead: int
    meeting_provider: str


class SlotResponse(BaseModel):
    start: datetime
    end: datetime
    label: str


class SlotsQueryResponse(BaseModel):
    timezone: str
    slots: list[SlotResponse]


class BookingCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    start: datetime
    company: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=50)
    notes: str | None = Field(default=None, max_length=2000)
    source: str | None = Field(default="website", max_length=100)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        if len(value) < 2 or not any(ch.isalpha() for ch in value):
            raise ValueError("Enter a valid name (at least 2 characters).")
        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str | None) -> str | None:
        if value is None or not value.strip():
            return None
        cleaned = value.strip()
        if not _E164_RE.match(cleaned):
            raise ValueError("Enter a valid phone number with country code (e.g. +923001234567).")
        return cleaned


class BookingCreateResponse(BaseModel):
    ok: bool = True
    booking_id: str
    start: datetime
    end: datetime
    timezone: str
    meeting_link: str
    cancel_url: str
    detail: str


class DaySlotCount(BaseModel):
    date: str
    available_count: int


class SlotAvailabilitySummary(BaseModel):
    timezone: str
    days: list[DaySlotCount]


class BookingCancelRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    token: str | None = Field(default=None, min_length=16, max_length=128)
    email: EmailStr | None = None
    booking_id: str | None = Field(default=None, max_length=64)


class BookingCancelResponse(BaseModel):
    ok: bool = True
    detail: str
    freed_slot: datetime | None = None


class FunnelStatsResponse(BaseModel):
    total_bookings: int
    upcoming_bookings: int
    bookings_last_30_days: int
