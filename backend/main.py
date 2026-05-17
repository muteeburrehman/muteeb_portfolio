"""FastAPI contact API — SMTP notifications for Muteeb Labs portfolio."""

from __future__ import annotations

import logging
import os
import sys
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.contact import router as contact_router


def _bootstrap_config() -> None:
    here = Path(__file__).resolve().parent
    load_dotenv(here / ".env")
    load_dotenv(here.parent / ".env", override=False)


_bootstrap_config()

_logging_level = getattr(logging, os.getenv("LOG_LEVEL", "INFO").upper(), logging.INFO)
logging.basicConfig(
    level=_logging_level,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    host = os.getenv("EMAIL_HOST") or os.getenv("SMTP_HOST")
    missing: list[str] = []
    if not host:
        missing.append("EMAIL_HOST")
    if not os.getenv("EMAIL_USER"):
        missing.append("EMAIL_USER")
    if not os.getenv("EMAIL_PASS"):
        missing.append("EMAIL_PASS")
    if missing:
        logger.warning("SMTP incomplete (missing %s) — mail will fail until .env is set.", missing)
    else:
        logger.info("SMTP configured for %s", host)
    yield


app = FastAPI(
    title="Muteeb Portfolio Contact API",
    version="1.0.0",
    description="Receives contact submissions and sends branded HTML email.",
    lifespan=lifespan,
)

_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins or ["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=("GET", "POST", "OPTIONS"),
    allow_headers=("*"),
)

app.include_router(contact_router)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}
