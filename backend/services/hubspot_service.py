"""Optional HubSpot CRM sync — contact + deal on each booking (free CRM API)."""

from __future__ import annotations

import logging
import os
from datetime import datetime

import httpx

logger = logging.getLogger(__name__)

HUBSPOT_API = "https://api.hubapi.com"


def _enabled() -> bool:
    if os.getenv("HUBSPOT_ENABLED", "").strip().lower() in ("0", "false", "no", "off"):
        return False
    return bool(os.getenv("HUBSPOT_ACCESS_TOKEN", "").strip())


def _headers() -> dict[str, str]:
    token = os.getenv("HUBSPOT_ACCESS_TOKEN", "").strip()
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }


def sync_booking_to_hubspot(
    *,
    name: str,
    email: str,
    company: str | None,
    phone: str | None,
    notes: str | None,
    starts_at: datetime,
    meeting_link: str,
) -> tuple[str | None, str | None]:
    """Create/update contact and deal. Returns (contact_id, deal_id) or (None, None)."""
    if not _enabled():
        return None, None

    contact_id = _upsert_contact(name=name, email=email, company=company, phone=phone)
    if not contact_id:
        return None, None

    deal_id = _create_deal(
        name=name,
        email=email,
        starts_at=starts_at,
        meeting_link=meeting_link,
        notes=notes,
    )
    if deal_id:
        _associate_deal_contact(deal_id, contact_id)

    return contact_id, deal_id


def _upsert_contact(
    *,
    name: str,
    email: str,
    company: str | None,
    phone: str | None,
) -> str | None:
    parts = name.strip().split(maxsplit=1)
    first = parts[0]
    last = parts[1] if len(parts) > 1 else ""

    properties: dict[str, str] = {
        "email": email,
        "firstname": first,
        "lastname": last,
        "lifecyclestage": "lead",
        "hs_lead_status": "NEW",
    }
    if company:
        properties["company"] = company
    if phone:
        properties["phone"] = phone

    payload = {"properties": properties}

    try:
        with httpx.Client(timeout=15.0) as client:
            # Search by email
            search = client.post(
                f"{HUBSPOT_API}/crm/v3/objects/contacts/search",
                headers=_headers(),
                json={
                    "filterGroups": [
                        {
                            "filters": [
                                {
                                    "propertyName": "email",
                                    "operator": "EQ",
                                    "value": email,
                                }
                            ]
                        }
                    ],
                    "properties": ["email"],
                    "limit": 1,
                },
            )
            if search.status_code == 200:
                results = search.json().get("results") or []
                if results:
                    contact_id = results[0]["id"]
                    client.patch(
                        f"{HUBSPOT_API}/crm/v3/objects/contacts/{contact_id}",
                        headers=_headers(),
                        json=payload,
                    )
                    return contact_id

            create = client.post(
                f"{HUBSPOT_API}/crm/v3/objects/contacts",
                headers=_headers(),
                json=payload,
            )
            create.raise_for_status()
            return create.json().get("id")
    except Exception:
        logger.exception("HubSpot contact sync failed for <%s>", email)
        return None


def _create_deal(
    *,
    name: str,
    email: str,
    starts_at: datetime,
    meeting_link: str,
    notes: str | None,
) -> str | None:
    deal_name = os.getenv("HUBSPOT_DEAL_NAME_PREFIX", "Discovery call").strip()
    pipeline = os.getenv("HUBSPOT_PIPELINE_ID", "default").strip()
    stage = os.getenv("HUBSPOT_DEAL_STAGE", "appointmentscheduled").strip()

    local_time = starts_at.strftime("%Y-%m-%d %H:%M UTC")
    description = f"Booked via website.\nWhen: {local_time}\nMeet: {meeting_link}\nEmail: {email}"
    if notes:
        description += f"\nNotes: {notes}"

    payload = {
        "properties": {
            "dealname": f"{deal_name} — {name}",
            "pipeline": pipeline,
            "dealstage": stage,
            "description": description,
        }
    }

    try:
        with httpx.Client(timeout=15.0) as client:
            resp = client.post(
                f"{HUBSPOT_API}/crm/v3/objects/deals",
                headers=_headers(),
                json=payload,
            )
            resp.raise_for_status()
            return resp.json().get("id")
    except Exception:
        logger.exception("HubSpot deal create failed for <%s>", email)
        return None


def _associate_deal_contact(deal_id: str, contact_id: str) -> None:
    try:
        with httpx.Client(timeout=15.0) as client:
            client.put(
                f"{HUBSPOT_API}/crm/v3/objects/deals/{deal_id}/associations/contacts/{contact_id}/deal_to_contact",
                headers=_headers(),
            )
    except Exception:
        logger.exception("HubSpot deal association failed deal=%s contact=%s", deal_id, contact_id)
