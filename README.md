# Muteeb Ur Rehman — Portfolio

Personal portfolio (not tied to any company site). React, Vite, Tailwind, contact form → branded HTML email via FastAPI + Gmail SMTP.

**Sales funnel:** built-in discovery-call booking at `/book`. **Start here:** [docs/FUNNEL_SETUP_GUIDE.md](docs/FUNNEL_SETUP_GUIDE.md) (credentials, HubSpot CRM, n8n flows, booking admin key). Also: [docs/SETUP_CREDENTIALS.md](docs/SETUP_CREDENTIALS.md) · [docs/SALES_FUNNEL.md](docs/SALES_FUNNEL.md).

## Local

```bash
npm install && npm run dev
cd backend && pip install -r requirements.txt
cp ../.env.example ../.env   # EMAIL_PASS = Gmail app password
uvicorn main:app --reload --port 8000
```

## Deploy (Docker — standalone)

Full architecture and Cloudflare notes: **[deploy/DEPLOY.md](deploy/DEPLOY.md)**

```bash
cp .env.example .env
# Set SITE_DOMAIN, ACME_EMAIL, PUBLIC_SITE_URL, EMAIL_*
docker compose up -d --build
```

Stack:

| Container | Host ports | Purpose |
|-----------|------------|---------|
| `muteeb-caddy` | **80, 443** | TLS + reverse proxy (public) |
| `muteeb-web` | *(internal)* | Static SPA + nginx API proxy |
| `muteeb-api` | *(internal)* | FastAPI contact & booking |

Verify: `curl -sS https://muteeblabs.uk/healthz` → `ok`
