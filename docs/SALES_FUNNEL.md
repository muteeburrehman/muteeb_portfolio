# Sales funnel — booking, CRM, and automation

Your site includes a **built-in discovery-call scheduler** at `/book` with optional **HubSpot CRM** and **n8n** hooks. This replaces external Calendly links for the core funnel.

> **Setup instructions (credentials, n8n, HubSpot, admin key):** [FUNNEL_SETUP_GUIDE.md](./FUNNEL_SETUP_GUIDE.md)

## Funnel flow

```
Website (/book or CTAs)
    → Pick date & slot (your availability rules)
    → Enter name / email / notes
    → API saves booking + sends emails
    → HubSpot contact + deal (if enabled)
    → n8n webhook (if enabled) for extra automation
```

**Contact form** (`/contact`) remains a separate top-of-funnel path; both can feed HubSpot via n8n if you wire it.

### No double-booking

Only **one confirmed client** can hold a given time. Booked slots are hidden from `/book`. If two people try the same time, the second request fails. When a client **cancels** (link in the confirmation email → `/book/cancel`), the slot opens again for others.

## 1. Set your free/busy schedule

Edit `backend/data/availability.json`:

- `weekly_hours` — which days and times are open (e.g. Mon–Fri 10:00–18:00)
- `blocked_dates` — holidays `["2026-12-25"]`
- `blocked_ranges` — ISO intervals for vacations
- `min_notice_hours` — e.g. 24 = no same-day bookings
- `max_days_ahead` — how far clients can book

Override timezone via `.env`:

```env
BOOKING_TIMEZONE=Asia/Karachi
BOOKING_DURATION_MINUTES=30
BOOKING_BUFFER_MINUTES=15
```

## 2. Google Meet or Zoom link

Add **one recurring meeting room** (startup-friendly, no API cost):

```env
MEETING_LINK=https://zoom.us/j/XXXXXXXX
# or
MEETING_LINK=https://meet.google.com/xxx-xxxx-xxx
```

Every confirmed booking uses this link in emails and on the success screen.

**Later (paid/dev time):** Google Calendar API can create **unique** Meet links per event.

## 3. HubSpot CRM (free tier)

1. Create a [HubSpot free account](https://www.hubspot.com/).
2. **Settings → Integrations → Private Apps** → create app with scopes:
   - `crm.objects.contacts.read/write`
   - `crm.objects.deals.read/write`
3. Copy the access token into `.env`:

```env
HUBSPOT_ENABLED=true
HUBSPOT_ACCESS_TOKEN=pat-na1-...
```

4. In HubSpot, open **Sales → Deals → Pipeline** and note:
   - **Pipeline ID** (internal)
   - **Deal stage ID** for “meeting scheduled” (e.g. `appointmentscheduled`)

```env
HUBSPOT_PIPELINE_ID=default
HUBSPOT_DEAL_STAGE=appointmentscheduled
HUBSPOT_DEAL_NAME_PREFIX=Discovery call
```

Each booking creates/updates a **contact** and a **deal** in that stage.

## 4. n8n automation (optional, self-hosted = free)

When a booking is confirmed, the API POSTs JSON to your webhook:

```env
N8N_BOOKING_WEBHOOK_URL=https://your-n8n.example/webhook/booking
```

Example n8n flow:

1. Webhook trigger (`booking.created`)
2. HubSpot node (backup or enrich data)
3. Slack / email to team
4. Google Sheets row for reporting
5. Delay → reminder email before call

## 5. View booking stats

Bookings are stored in SQLite (`BOOKING_DB_PATH`, default `/data/bookings.sqlite` in Docker).

Internal stats endpoint (set a secret key):

```env
BOOKING_ADMIN_KEY=your-long-random-secret
```

```bash
curl "https://muteeblabs.com/api/booking/stats?key=your-long-random-secret"
```

Returns: total bookings, upcoming, last 30 days.

You also receive **email** notifications at `EMAIL_TO` for each booking.

## 6. Deploy checklist

- [ ] `MEETING_LINK` set
- [ ] `availability.json` matches your real hours
- [ ] `HUBSPOT_*` if using CRM
- [ ] `N8N_BOOKING_WEBHOOK_URL` if using automation
- [ ] `BOOKING_ADMIN_KEY` for stats
- [ ] Rebuild: `docker compose up -d --build`
- [ ] Test: open `/book`, book a slot, check email + HubSpot

## Cost summary

| Piece | Typical cost |
|--------|----------------|
| Built-in scheduler | $0 (your server) |
| HubSpot CRM | $0 (free tier) |
| n8n (self-host) | $0 |
| Zoom / Google Meet static room | $0 |
| Calendly / Cal.com | Not required |

## API reference

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/booking/config` | Duration, timezone, limits |
| GET | `/booking/slots?from=YYYY-MM-DD&to=YYYY-MM-DD` | Open slots |
| POST | `/booking` | Create booking |
| GET | `/booking/stats?key=...` | Admin metrics |

Frontend proxy: `/api/booking/*` → API (see `nginx.conf`).
