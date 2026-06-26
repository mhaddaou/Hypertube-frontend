# Running Hypertube Locally

The project has three pieces you need running at once:

1. **PostgreSQL** — the database
2. **hypertube_api** — the NestJS backend (port `5000`)
3. **Hypertube-frontend** — the Next.js frontend (port `3000`)

## Prerequisites

- Node.js 20+
- pnpm (or pnpm)
- Docker + Docker Compose (easiest way to run Postgres)

## 1. Clone both repos

```bash
git clone https://github.com/mhaddaou/hypertube_api.git
git clone https://github.com/mhaddaou/Hypertube-frontend.git
```

## 2. Start the database

From the backend repo:

```bash
cd hypertube_api
docker compose up -d
```

This starts Postgres on `localhost:5432` with user/password/db all set to `hypertube` (see `docker-compose.yml`).

## 3. Run the backend

```bash
cd hypertube_api
cp .env.example .env
```

Edit `.env` — at minimum set:

```dotenv
DATABASE_URL="postgresql://hypertube:hypertube@localhost:5432/hypertube"
PORT=5000
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="anything-random-for-local-dev"
```

(The 42/Google OAuth and SMTP variables are optional — only needed if you want to test social login or password-reset emails.)

Then install, migrate, and start:

```bash
pnpm install
npx prisma migrate dev
pnpm run start:dev
```

- API runs at **http://localhost:5000**
- Swagger docs at **http://localhost:5000/api/docs**

## 4. Run the frontend

In a separate terminal:

```bash
cd Hypertube-frontend/hypertube
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
pnpm install
pnpm run dev
```

- Frontend runs at **http://localhost:3000**

## 5. Open it

Visit **http://localhost:3000** in your browser. Make sure the backend (step 3) is already running first — otherwise movie data will fall back to placeholder content.

## Stopping everything

```bash
# stop frontend / backend: Ctrl+C in their terminals
# stop the database:
cd hypertube_api && docker compose down
```
