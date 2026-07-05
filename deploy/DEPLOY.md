# Production deployment

Standalone Docker stack for **Muteeb Portfolio** — no shared reverse proxy or legacy project dependencies.

## Architecture

```
                    ┌─────────────────────────────────────────┐
  Cloudflare        │  VPS (muteeb-ubuntu)                    │
  (DNS + CDN)       │                                         │
       │            │  ┌─────────────┐                        │
       │  :443/:80  │  │ muteeb-caddy│  ports 80, 443       │
       └───────────►│  │  (Caddy)    │◄─── public internet   │
                    │  └──────┬──────┘                        │
                    │         │ edge network (internal)       │
                    │  ┌──────▼──────┐                        │
                    │  │ muteeb-web  │  nginx + static SPA   │
                    │  │  :80        │  /api/* → api         │
                    │  └──────┬──────┘                        │
                    │         │ internal network              │
                    │  ┌──────▼──────┐                        │
                    │  │ muteeb-api  │  FastAPI (not public)  │
                    │  │  :8000      │                        │
                    │  └─────────────┘                        │
                    └─────────────────────────────────────────┘
```

| Layer | Role |
|-------|------|
| **caddy** | Public edge — TLS (Let's Encrypt), HTTP→HTTPS, security headers, Cloudflare-aware client IP |
| **web** | App server — Vite build, SPA routing, reverse-proxies `/api/*` to FastAPI |
| **api** | Backend — contact email, booking API; reachable only from `web` on the internal network |

### Why Option B (dedicated proxy) over exposing `web` on port 80

| | Option A (`web` on `:80`) | Option B (Caddy edge) ✓ |
|--|---------------------------|-------------------------|
| HTTPS on origin | Manual / none | Automatic Let's Encrypt |
| Cloudflare Full (Strict) | Hard without origin cert | Supported |
| Security headers / HTTP/2 | Extra nginx config | Built into Caddy |
| API exposure | Risk if misconfigured | API never published to host |
| Future services (n8n, etc.) | Port conflicts | Add routes in Caddyfile |

## Prerequisites

1. **DNS:** `SITE_DOMAIN` (e.g. `dev.muteeblabs.uk`) → VPS public IP (Cloudflare proxied is fine).
2. **Firewall:** allow inbound **80** and **443** to the VPS.
3. **Nothing else** should bind host ports 80/443 (`ss -tlnp | grep -E ':80|:443'` should show `docker-proxy` after deploy).

## Deploy

```bash
cp .env.example .env
# Edit .env — at minimum:
#   SITE_DOMAIN=dev.muteeblabs.uk
#   ACME_EMAIL=business@muteeblabs.uk
#   PUBLIC_SITE_URL=https://dev.muteeblabs.uk
#   EMAIL_* for contact/booking

docker compose down
docker compose up -d --build
```

## Verify

```bash
docker compose ps
ss -tlnp | grep -E ':80|:443'
curl -sS http://127.0.0.1/healthz -H 'Host: dev.muteeblabs.uk'   # ok
curl -sS https://dev.muteeblabs.uk/healthz                         # ok
```

Expected containers: `muteeb-caddy`, `muteeb-web`, `muteeb-api` — all healthy.

## Cloudflare settings

| Setting | Recommended value |
|---------|-------------------|
| SSL/TLS mode | **Full (strict)** |
| Always Use HTTPS | On |
| Minimum TLS | 1.2 |

Caddy obtains a Let's Encrypt certificate on the origin. The first request after deploy may take ~30–60s while ACME completes.

If certificate issuance fails with proxied DNS, temporarily set the record to **DNS only** (grey cloud), run `docker compose up -d`, wait for cert, then re-enable proxy.

## Maintenance

```bash
# Update site after git pull
docker compose up -d --build

# Logs
docker compose logs -f caddy
docker compose logs -f web
docker compose logs -f api

# Renewals — automatic via Caddy (stored in caddy_data volume)
```

## Migrating from the old Qubix proxy

The previous setup relied on `qubix-nginx` on an external Docker network (`qubix-solutions_qubix-net`). That container exposed host **80/443**. After removing Qubix, nothing listened on those ports → **Cloudflare Error 521**.

This stack replaces that with **muteeb-caddy** inside the same `docker-compose.yml`. No external networks or legacy project names.

Optional cleanup on the VPS:

```bash
docker network rm qubix-solutions_qubix-net   # only if unused
docker volume prune                           # review before confirming
```
