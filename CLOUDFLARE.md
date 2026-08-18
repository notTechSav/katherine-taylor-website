# Cloudflare Pages Deployment

This project deploys as a **Vite SPA** on Cloudflare Pages with **Pages Functions** for API routes.

## Live URLs

| Environment | URL |
|-------------|-----|
| Production (canonical) | https://katherinetaylorescort.com |
| Pages alias | https://katherine-taylor-website.pages.dev |
| Preview (example) | https://b02b672e.katherine-taylor-website.pages.dev |

Each deploy gets a unique preview URL; production is served from the custom domain above once DNS is bound.

## Custom domain setup

1. In Cloudflare Pages → **katherine-taylor-website** → **Custom domains**, add:
   - `katherinetaylorescort.com` (apex)
   - `www.katherinetaylorescort.com` (for redirect source)
2. Or via CLI:
   ```bash
   npx wrangler pages domain add katherinetaylorescort.com --project-name katherine-taylor-website
   npx wrangler pages domain add www.katherinetaylorescort.com --project-name katherine-taylor-website
   ```
3. Ensure DNS for the zone points apex/`www` at Pages (CNAME to `katherine-taylor-website.pages.dev` or Cloudflare's recommended records).

## www → apex redirect (301)

The canonical hostname is **apex** (`katherinetaylorescort.com`). `www` must permanently redirect to apex.

**Primary (recommended):** Cloudflare **Bulk Redirects** ([docs](https://developers.cloudflare.com/pages/how-to/www-redirect/)):

| Source URL | Target URL | Status | Parameters |
|------------|------------|--------|------------|
| `www.katherinetaylorescort.com` | `https://katherinetaylorescort.com` | 301 | Preserve query string, Subpath matching, Preserve path suffix |

Create a Bulk Redirect Rule that uses this list. Add a proxied DNS record for `www` (A `192.0.2.1` or CNAME to Pages).

**Also in repo:** `public/_redirects` includes a host-based www→apex rule as a secondary path when both hostnames serve the same Pages project.

Verify after DNS propagates:

```bash
curl -I https://www.katherinetaylorescort.com/
# Expect: HTTP/2 301, location: https://katherinetaylorescort.com/...
```

## Canonical URLs

Single source of truth: `client/lib/site-config.ts` (`SITE_URL = https://katherinetaylorescort.com`).

Static files (`index.html`, `public/sitemap.xml`, `public/video-sitemap.xml`, `public/robots.txt`) use apex HTTPS. Journal and San Francisco pages use `absoluteUrl()` from site-config.

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
- Canonical URLs use `https://katherinetaylorescort.com` (see `client/lib/site-config.ts`)
