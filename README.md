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
- Deploy command: `npx wrangler deploy`

The Worker uses `wrangler.toml` for static assets and the contact form API.

## Contact Form Email

The contact question form posts to `/api/contact` and sends email through Resend.

Cloudflare Worker variables/secrets:

- `RESEND_API_KEY` as a secret.
- `CONTACT_TO_EMAIL` is currently set to `antoao208@gmail.com` in `wrangler.toml`.
- `RESEND_FROM_EMAIL` is optional. Add it after a verified professional sender domain is ready.

Until a verified professional domain is added in Resend, the default sender is `VisionPoint CPA <onboarding@resend.dev>`.

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
