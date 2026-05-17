# Muteeb Ur Rehman — Portfolio

Personal portfolio (not tied to any company site). React, Vite, Tailwind, contact form → branded HTML email via FastAPI + Gmail SMTP.

## Local

```bash
npm install && npm run dev
cd backend && pip install -r requirements.txt
cp ../.env.example ../.env   # EMAIL_PASS = Gmail app password
uvicorn main:app --reload --port 8000
```

## Deploy (Docker)

```bash
cp .env.example .env
docker compose up -d --build
```

This starts **your** containers only: `muteeb-web` (static site + `/api/contact`) and `muteeb-api` (email).

### Why host nginx is involved

On your VPS, **one** nginx container already uses ports **80/443** for several apps. This project does not replace that — it adds `muteeb-web` on an internal Docker network. You must add **one** `server_name dev.muteeblabs.uk` block on the **host** nginx so that hostname reaches `muteeb-web`, not inventory or anything else.

1. DNS: `dev.muteeblabs.uk` → VPS IP  
2. Find conflicts: `docker exec <host-nginx> grep -r "dev.muteeblabs.uk" /etc/nginx/`  
3. Install vhost (HTTP first — no cert yet): `cp edge-nginx-dev.muteeblabs.uk.conf` → host nginx `conf.d/`, reload  
4. Test: `curl http://dev.muteeblabs.uk/healthz` → `ok`  
5. Cert: `certbot certonly --webroot … -d dev.muteeblabs.uk`  
6. HTTPS: `cp edge-nginx-dev.muteeblabs.uk.ssl.conf` over `dev.muteeblabs.uk.conf`, reload  
7. Test: `curl https://dev.muteeblabs.uk/healthz` → `ok`  

Set `EDGE_PROXY_NETWORK` in `.env` to the Docker network your host nginx shares with app containers (`docker network ls`).
