# syntax=docker/dockerfile:1.7
# Targets: web (static SPA + nginx), api (FastAPI contact)

# ---------- web: build frontend ----------
FROM node:22-alpine AS web-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS web-build
WORKDIR /app
ARG VITE_CONTACT_API_URL=/api/contact
ARG VITE_SITE_URL=https://muteeblabs.uk
ENV VITE_CONTACT_API_URL=$VITE_CONTACT_API_URL VITE_SITE_URL=$VITE_SITE_URL
COPY --from=web-deps /app/node_modules ./node_modules
COPY package.json package-lock.json index.html vite.config.ts tsconfig*.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.27-alpine AS web
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=web-build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

# ---------- api: contact email ----------
FROM python:3.12-slim-bookworm AS api
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends wget \
 && rm -rf /var/lib/apt/lists/*
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/main.py .
COPY backend/data ./data
COPY backend/routers ./routers
COPY backend/schemas ./schemas
COPY backend/services ./services
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8000/healthz || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
