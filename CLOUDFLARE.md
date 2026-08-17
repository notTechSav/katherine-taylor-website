# Cloudflare Pages Deployment

This project deploys as a **Vite SPA** on Cloudflare Pages with **Pages Functions** for API routes.

## Build settings (Cloudflare Dashboard)

| Setting | Value |
|---------|-------|
| Build command | `pnpm install && pnpm run build:client` |
| Build output directory | `dist/spa` |
| Root directory | `/` |
| Node.js version | 22 |

## Environment variables

Set in Cloudflare Pages → Settings → Environment variables:

- `PING_MESSAGE` — health check response (optional)
- `ANTHROPIC_API_KEY` — required for AI content/concierge features
- `VITE_ANTHROPIC_API_KEY` — client-side if needed at build time

## Local development

```bash
pnpm install
pnpm dev          # Vite + Express API on :8080
pnpm build        # dist/spa + dist/server
pnpm start        # Production Node server (SPA + API)
```

## Deploy

```bash
pnpm run build:client
npx wrangler pages deploy dist/spa --project-name katherine-taylor-website
```

Pages Functions in `functions/` are picked up automatically when deploying via Wrangler or Git integration.

## API routes

| Route | Dev (Express) | Production (Pages Functions) |
|-------|---------------|------------------------------|
| GET /api/ping | ✅ | ✅ |
| POST /api/inquiry | ✅ | ✅ |
| POST /api/luxury-inquiry | ✅ | ⚠️ needs Worker port |
| POST /api/content/* | ✅ | ⚠️ needs Worker port + ANTHROPIC_API_KEY |

For full API parity (AI content, luxury inquiry), deploy `dist/server` to a Node host or port remaining routes to Pages Functions.

## Migration from Vercel

- `vercel.json` SPA rewrites → `public/_redirects` + `wrangler.toml`
- Remove `.vercel/` after first successful Cloudflare preview
- Update canonical URLs from `*.vercel.app` to `katherinetaylorescort.com`
