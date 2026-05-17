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
2. **Edge nginx (required):** `docker compose up` only starts `muteeb-web` / `muteeb-api`. Traffic still goes through **qubix-nginx**. Without a vhost, another site (e.g. inventory) wins as default.  
   ```bash
   docker exec qubix-nginx grep -r "dev.muteeblabs.uk" /etc/nginx/   # find wrong config
   cp edge-nginx-dev.muteeblabs.uk.conf /opt/qubix/nginx/conf.d/dev.muteeblabs.uk.conf
   docker exec qubix-nginx nginx -t && docker exec qubix-nginx nginx -s reload
   ```  
3. SSL (Qubix stack dir): `docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d dev.muteeblabs.uk --agree-tos --email YOUR@EMAIL`  
4. Test: `curl -sS https://dev.muteeblabs.uk/healthz` → `ok` (not inventory login HTML)

Update: `docker compose up -d --build`
