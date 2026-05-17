# Muteeb Ur Rehman — Portfolio

React, TypeScript, Vite, Tailwind CSS, React Router. Contact form sends **branded HTML email** via FastAPI + SMTP.

## Local

```bash
npm install && npm run dev          # :5173 — proxies /api/contact → :8000
cd backend && pip install -r requirements.txt
cp ../.env.example ../.env          # set EMAIL_PASS
uvicorn main:app --reload --port 8000
```

## Deploy (Docker)

Uses your existing **qubix-nginx** (no extra host ports). Internal containers: `muteeb-web:80`, `muteeb-api:8000`.

```bash
cp .env.example .env   # secrets + SMTP
docker compose up -d --build
```

1. DNS: `dev.muteeblabs.uk` → VPS  
2. Add to **qubix** `nginx/conf.d/` a server for `dev.muteeblabs.uk` with `proxy_pass http://muteeb-web:80;` (include `/api/contact` and SPA `location /`). Reload `qubix-nginx`.  
3. SSL from Qubix stack dir: `docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d dev.muteeblabs.uk --agree-tos --email YOUR@EMAIL`  
4. Test: `curl https://dev.muteeblabs.uk/healthz`

Update: `docker compose up -d --build`
