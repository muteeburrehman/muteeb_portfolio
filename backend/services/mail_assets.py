"""Branded email assets (inline CID attachments)."""

from __future__ import annotations

import os
from pathlib import Path

LOGO_CID = "muteeblabs-logo"


def logo_path() -> Path | None:
    env = os.getenv("MAIL_LOGO_PATH", "").strip()
    if env:
        path = Path(env)
        return path if path.is_file() else None

    here = Path(__file__).resolve().parent
    candidates = [
        here.parent / "assets" / "logo.png",
        here.parent.parent / "public" / "logo.png",
        Path("/app/assets/logo.png"),
    ]
    for candidate in candidates:
        if candidate.is_file():
            return candidate
    return None


def logo_cid_src() -> str:
    return f"cid:{LOGO_CID}"
