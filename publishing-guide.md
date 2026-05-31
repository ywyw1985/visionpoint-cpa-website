# Publishing Guide

Publish the contents of this `outputs` folder as a static website.

## Files to publish

- `index.html`
- `styles.css`
- `robots.txt`
- `sitemap.xml`
- `assets/cpa-firm-hero.png`
- all subfolders

## Cloudflare Workers Static Assets

Suggested deployment command from inside the published folder:

```bash
npx wrangler deploy --assets . --name visionpoint-cpa --compatibility-date 2026-05-30
```

## Custom domain

The site uses `visionpointcpa.com` as its canonical domain.

Typical DNS setup:

- `www.yourdomain.com` as a `CNAME` pointing to the host's provided address.
- `yourdomain.com` as an apex/root record using the host's recommended `A`, `ALIAS`, `ANAME`, or flattening option.
