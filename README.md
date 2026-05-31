# VISIONPOINT TAX & ACCOUNTING INCORPORATED

VISIONPOINT TAX & ACCOUNTING INCORPORATED is a static CPA firm website for:

- Tax planning
- Accounting and bookkeeping
- Payroll coordination
- Business advisory
- Client resources
- Future Chinese-language content

The site is structured for Cloudflare Workers Static Assets, similar to the koi website build.

## Deployment

Cloudflare settings:

- Build command: `exit 0`
- Deploy command: `npx wrangler deploy --assets . --name visionpoint-cpa --compatibility-date 2026-05-30`

## Domain

The current canonical domain is `visionpointcpa.com`.

If the domain ever changes, replace `visionpointcpa.com` in:

- `index.html`
- `robots.txt`
- `sitemap.xml`
- all page canonical tags

## Content Structure

- `/services/`
- `/tax-planning/`
- `/business-advisory/`
- `/resources/`
- `/about/`
- `/contact/`
- `/zh/`
