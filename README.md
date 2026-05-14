# Personal Site

Production-ready Next.js content platform with MDX articles, static case/research pages, sitemap, robots.txt, and RSS.

## Development

```bash
npm install
npm run dev
```

## Production Check

```bash
npm run lint
npm run build
npm run start
```

## Vercel Deployment

Vercel can deploy this project with the standard Next.js preset.

Use:
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave empty

Set this environment variable in Vercel Production before connecting the custom domain:

```bash
SITE_URL=https://your-domain.com
```

`SITE_URL` is used for canonical URLs, Open Graph URLs, sitemap, robots.txt, and RSS feed links.

## Netlify Deployment

This project includes `netlify.toml` for file-based Netlify settings:

- Build Command: `npm run build`
- Publish Directory: `.next`
- Node Version: `22`

Netlify supports the Next.js App Router through its automatic OpenNext adapter. Do not configure this project as a static export and do not add a `/* /index.html 200` SPA fallback, or App Router pages can resolve to Netlify's static 404 page.

The adapter is also listed explicitly in `netlify.toml` to avoid dashboard auto-detection drift. If Netlify shows its platform 404 page at `/` after a successful build, check the deploy log for the `@netlify/plugin-nextjs` / OpenNext adapter step and make sure the publish directory is `.next`, not `out`, `dist`, or `public`.

Set `SITE_URL` in Netlify Production after connecting the custom domain if you want canonical URLs to always use that domain. If it is not set, the SEO helpers fall back to Netlify's `URL`, `DEPLOY_PRIME_URL`, or `DEPLOY_URL` build variables.
