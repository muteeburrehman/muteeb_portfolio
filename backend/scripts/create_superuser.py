#!/usr/bin/env python3
"""Create or update a super-user for the private /admin/login page."""

from __future__ import annotations

import argparse
import getpass
import sys
from pathlib import Path

from dotenv import load_dotenv

BACKEND_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_ROOT))

load_dotenv(BACKEND_ROOT.parent / ".env", override=True)
load_dotenv(BACKEND_ROOT / ".env", override=True)

from services.super_user_store import init_super_users_db, upsert_super_user  # noqa: E402


def main() -> int:
    parser = argparse.ArgumentParser(description="Create or update an admin super-user.")
    parser.add_argument("--email", required=True, help="Super-user email (login username)")
    parser.add_argument(
        "--password",
        help="Password (omit to prompt securely; avoid passing on shared shells)",
    )
    args = parser.parse_args()

    password = args.password
    if not password:
        password = getpass.getpass("Password: ")
        confirm = getpass.getpass("Confirm password: ")
        if password != confirm:
            print("Passwords do not match.", file=sys.stderr)
            return 1

    if len(password) < 8:
        print("Use a password with at least 8 characters.", file=sys.stderr)
        return 1

    init_super_users_db()
    user = upsert_super_user(email=args.email, password=password)
    print(f"Super-user ready: {user.email}")
    print("Sign in at /admin/login (not linked on the public site).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
