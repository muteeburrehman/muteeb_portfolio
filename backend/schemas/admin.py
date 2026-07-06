"""Admin API response models."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class AdminSessionResponse(BaseModel):
    ok: bool
    email: EmailStr


class AdminOverviewResponse(BaseModel):
    contacts_total: int
    contacts_pending: int
    contacts_replied: int
    bookings_confirmed: int
    bookings_cancelled: int
    bookings_upcoming: int
    bookings_last_30_days: int


class AdminContactItem(BaseModel):
    id: str
    name: str
    email: EmailStr
    message: str
    topic: str | None
    service: str | None
    company: str | None
    phone: str | None
    created_at: datetime
    replied_at: datetime | None
    replied: bool


class AdminContactListResponse(BaseModel):
    items: list[AdminContactItem]


class AdminBookingItem(BaseModel):
    id: str
    name: str
    email: EmailStr
    company: str | None
    phone: str | None
    notes: str | None
    starts_at: datetime
    ends_at: datetime
    meeting_link: str
    status: str
    created_at: datetime


class AdminBookingListResponse(BaseModel):
    items: list[AdminBookingItem]


class AdminContactPatchResponse(BaseModel):
    ok: bool
    contact: AdminContactItem


class AdminAnalyticsDay(BaseModel):
    labels: list[str]
    contacts_per_day: list[int]
    contacts_replied_per_day: list[int]
    bookings_per_day: list[int]
    bookings_confirmed_per_day: list[int]
    bookings_cancelled_per_day: list[int]
    days: int
    totals: dict[str, int]


class AdminBookingCancelResponse(BaseModel):
    ok: bool
    booking: AdminBookingItem
    detail: str


class AdminDeleteResponse(BaseModel):
    ok: bool = True
    detail: str


class AdminSendMessageRequest(BaseModel):
    to_email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=10000)
    recipient_name: str | None = Field(default=None, max_length=200)
    contact_id: str | None = None


class AdminSendMessageResponse(BaseModel):
    ok: bool
    detail: str
