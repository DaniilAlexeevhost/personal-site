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
