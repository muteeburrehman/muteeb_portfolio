# Credentials & environment setup

What you **must** set vs what is **optional** for the portfolio + booking funnel.

> **Full walkthrough (n8n flows, HubSpot pipeline, booking admin key):**  
> See **[FUNNEL_SETUP_GUIDE.md](./FUNNEL_SETUP_GUIDE.md)** — start there if you are setting up CRM and automation.

---

## Required (contact form + booking emails)

These should already be in your `.env` for the site to send mail.

| Variable | What it is | Where to get it |
|----------|------------|-----------------|
| `EMAIL_USER` | Gmail address used to log in to SMTP | Your Gmail (e.g. `muteebworkinfo@gmail.com`) |
| `EMAIL_PASS` | Gmail **App Password** (16 characters) | [Google App Passwords](https://myaccount.google.com/apppasswords) — 2FA must be on |
| `EMAIL_FROM` | Address shown as sender | `business@muteeblabs.uk` (verify in Gmail → Send mail as) |
| `EMAIL_TO` | Inbox that receives leads & bookings | `business@muteeblabs.uk` |
| `EMAIL_HOST` | SMTP server | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USE_TLS` | Use STARTTLS | `True` |

**You do not put these in the React app** — only in `.env` for the Python API.

---

## Required for booking (meeting link)

Without this, confirmations point to your contact page instead of a real call.

| Variable | Example | What to do |
|----------|---------|------------|
| `MEETING_LINK` | `https://zoom.us/j/123456789` or `https://meet.google.com/abc-defg-hij` | Create a **recurring** Zoom room or Google Meet link and paste it here |

**Free:** Zoom free personal meeting room, or Google Meet schedule link.

---

## Optional — HubSpot CRM (free tier)

Syncs each booking to a **contact** + **deal** in HubSpot.

| Variable | Example |
|----------|---------|
| `HUBSPOT_ENABLED` | `true` |
| `HUBSPOT_ACCESS_TOKEN` | `pat-na1-xxxx` from a HubSpot private app |

**How to get the token:**

1. Sign up at [hubspot.com](https://www.hubspot.com/) (free CRM).
2. **Settings → Integrations → Private Apps → Create**.
3. Scopes: `crm.objects.contacts.read/write`, `crm.objects.deals.read/write`.
4. Copy the access token into `.env`.

**Pipeline (optional fine-tuning):**

| Variable | Default | Notes |
|----------|---------|--------|
| `HUBSPOT_PIPELINE_ID` | `default` | From HubSpot → Sales → Deals → Pipeline settings |
| `HUBSPOT_DEAL_STAGE` | `appointmentscheduled` | Stage ID when a call is booked |
| `HUBSPOT_DEAL_NAME_PREFIX` | `Discovery call` | Deal title prefix |

---

## Optional — n8n automation (free if self-hosted)

Fires a webhook on every new booking (Slack, Sheets, extra CRM steps).

| Variable | Example |
|----------|---------|
| `N8N_BOOKING_WEBHOOK_URL` | `https://your-n8n.com/webhook/booking` |

Create an n8n workflow: **Webhook** trigger → your actions. No n8n account cost if you host it yourself.

---

## Optional — booking admin stats

| Variable | Example |
|----------|---------|
| `BOOKING_ADMIN_KEY` | long random string |

Then open (replace domain and key):

`https://dev.muteeblabs.uk/api/booking/stats?key=YOUR_KEY`

---

## Schedule (no credentials — edit a file)

Edit **`backend/data/availability.json`**:

- Which weekdays and hours are open
- `blocked_dates` for holidays
- `min_notice_hours` (e.g. 24 = no same-day booking)

Override in `.env` if needed:

```env
BOOKING_TIMEZONE=Asia/Karachi
BOOKING_DURATION_MINUTES=30
BOOKING_BUFFER_MINUTES=15
```

---

## Local development (two terminals)

**Terminal 1 — frontend**

```bash
npm run dev
```

**Terminal 2 — API** (booking + contact need this)

```bash
cd backend
pip install -r requirements.txt
# copy ../.env or backend/.env with EMAIL_* and MEETING_LINK
python main.py
# or: uvicorn main:app --reload --port 8000
```

Vite proxies `/api/booking` → `http://127.0.0.1:8000/booking`.

Test: open `http://localhost:5173/book` — you should see date buttons, not a red API error.

---

## Production deploy

Standalone stack — see [deploy/DEPLOY.md](../deploy/DEPLOY.md).

```bash
cp .env.example .env   # SITE_DOMAIN, ACME_EMAIL, EMAIL_*, MEETING_LINK
docker compose up -d --build
curl -sS https://dev.muteeblabs.uk/healthz
```

Ensure `.env` on the server includes at least:

- All `EMAIL_*` variables  
- `MEETING_LINK`  
- `HUBSPOT_*` only if you use HubSpot  
- `N8N_BOOKING_WEBHOOK_URL` only if you use n8n  

---

## Quick checklist

| Feature | Required credentials |
|---------|----------------------|
| Contact form | `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `EMAIL_TO` |
| Booking page UI | API running (no extra keys) |
| Booking confirmation emails | Same email vars as contact |
| Zoom/Meet on confirm | `MEETING_LINK` |
| HubSpot deals | `HUBSPOT_ENABLED=true` + `HUBSPOT_ACCESS_TOKEN` |
| n8n funnel | `N8N_BOOKING_WEBHOOK_URL` |
| Custom hours | Edit `availability.json` only |

**Nothing from this list goes in GitHub** — keep secrets in `.env` only (already gitignored).
