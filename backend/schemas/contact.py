"""Pydantic models for inbound contact payloads (POST /contact)."""

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactSubmission(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="allow")

    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)

    topic: str | None = Field(default=None, max_length=200)
    service: str | None = Field(default=None, max_length=200)
    company: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=50)
