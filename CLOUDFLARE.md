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
2. Custom domains are added in the dashboard (**Custom domains** → **Set up a custom domain**) or via the Pages API (`POST .../pages/projects/katherine-taylor-website/domains`). Wrangler 4.x does **not** ship `pages domain add`; see **Domain status checklist** below.
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

## Domain status checklist (manual dashboard)

Wrangler **4.x** does not include `wrangler pages domain add` or `wrangler dns list`. Use the dashboard or Cloudflare API for custom domains and DNS.

### Pages custom domains

In **Workers & Pages** → **katherine-taylor-website** → **Custom domains**:

| Hostname | Typical status | Action |
|----------|----------------|--------|
| `katherinetaylorescort.com` | Active | If visitors see **403 blocked**, fix WAF (below)—not DNS. |
| `www.katherinetaylorescort.com` | Pending until DNS fixed | Replace legacy `www` record (see DNS). |

API equivalent (already used for `www`): `POST /accounts/{account_id}/pages/projects/katherine-taylor-website/domains` with body `{"name":"www.katherinetaylorescort.com"}`.

### DNS (`katherinetaylorescort.com` zone)

**DNS** → **Records**:

1. **Apex** — use Cloudflare’s recommended **CNAME flattening** to `katherine-taylor-website.pages.dev` (or the records Pages shows when you attach the apex domain). Apex should resolve to Cloudflare anycast IPs (e.g. `104.21.x.x`, `172.67.x.x`).
2. **`www`** — remove any **A** record pointing off Cloudflare (e.g. `91.195.240.13`). Add a **proxied** **CNAME**: `www` → `katherine-taylor-website.pages.dev` (orange cloud on). Until this is fixed, `www` fails TLS and Pages stays **Pending** with “CNAME record not set”.
3. Wait a few minutes, then confirm: `dig @1.1.1.1 +short www.katherinetaylorescort.com` should not return the old off-cloud IP.

### Bulk Redirects (www → apex) — dashboard only

There is **no** Wrangler CLI for Bulk Redirects. Configure in the zone:

1. Open **katherinetaylorescort.com** in the Cloudflare dashboard.
2. Go to **Rules** → **Redirect Rules**.
3. Open the **Bulk Redirects** tab (or **Create** → **Bulk Redirect** depending on UI).
4. **Create bulk redirect list** (e.g. name `www-to-apex`).
5. Add one entry:

   | Source URL | Target URL | Status |
   |------------|------------|--------|
   | `https://www.katherinetaylorescort.com` | `https://katherinetaylorescort.com` | 301 |

   Enable **Preserve query string**, **Subpath matching**, and **Preserve path suffix** (or equivalent toggles).

6. **Create bulk redirect rule** that applies that list to requests whose host is `www.katherinetaylorescort.com` (expression often: `(http.host eq "www.katherinetaylorescort.com")`).

7. Ensure `www` DNS is **proxied** through Cloudflare so the rule runs at the edge.

Repo fallback: `public/_redirects` host rule (only applies when both hostnames hit the same Pages deployment).

### Apex returns 403 “Sorry, you have been blocked”

The site can be **active on Pages** while the **zone WAF** blocks requests (curl and browsers get Cloudflare’s block page, not your SPA).

1. **Security** → **Events** — filter by hostname `katherinetaylorescort.com` and note the **Service** / **Rule ID** (use the Ray ID from the error page).
2. **Security** → **WAF** → **Custom rules** / **Firewall rules** — disable or narrow rules that block normal `GET /` traffic.
3. Check **Security** → **Settings** — temporarily set **Security Level** to *Essentially Off* or *Low* to test; revert after confirming Pages serves `200`.
4. **Security** → **Bots** — if **Bot Fight Mode** or aggressive bot rules are on, test with them off for this zone.

After fixes: `curl -I https://katherinetaylorescort.com/` should return **200** (or **301** only for intentional redirects). `curl -I https://www.katherinetaylorescort.com/` should return **301** to apex once DNS + Bulk Redirect are in place.

