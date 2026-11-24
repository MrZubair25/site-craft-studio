import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = path.resolve(process.cwd());
const clientDist = path.join(rootDir, 'dist', 'client');
const serverEntryPath = path.join(rootDir, 'dist', 'server', 'entry-server.js');
const templatePath = path.join(clientDist, 'index.html');

function resolveSiteUrl(): string {
  const raw = process.env.APP_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw) && !raw.includes('MY_APP_URL')) {
    return raw.replace(/\/+$/, '');
  }
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelHost) {
    const withProto = /^https?:\/\//i.test(vercelHost)
      ? vercelHost
      : `https://${vercelHost}`;
    return withProto.replace(/\/+$/, '');
  }
  return '';
}

function buildHeadTags(siteUrl: string): string {
  if (!siteUrl) return '';
  const ogImage = `${siteUrl}/assets/aistudio/zubair-sitecraft_3af9bc81.jpeg`;
  return [
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:alt" content="Zubair Akram — Framer Website Designer & Founder of Site Craft Studio" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n    ');
}

async function run() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing client build template at ${templatePath}`);
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`Missing SSR bundle at ${serverEntryPath}`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const mod = (await import(pathToFileURL(serverEntryPath).href)) as {
    render: () => string;
  };

  const appHtml = mod.render();
  const siteUrl = resolveSiteUrl();

  let finalHtml = template.replace('<!--ssr-html-->', appHtml);
  if (siteUrl) {
    finalHtml = finalHtml.replace('<!--ssr-head-->', buildHeadTags(siteUrl));
  }

  fs.writeFileSync(templatePath, finalHtml, 'utf-8');

  const today = new Date().toISOString().split('T')[0];
  if (siteUrl) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
    fs.writeFileSync(path.join(clientDist, 'sitemap.xml'), sitemap, 'utf-8');

    const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(clientDist, 'robots.txt'), robots, 'utf-8');
  }

  console.log(`SSG prerender complete -> ${templatePath}`);
}

run().catch((err) => {
  console.error('SSG prerender failed:', err);
  process.exit(1);
});
