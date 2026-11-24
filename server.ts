import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import express from 'express';
import type { Request, Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT) || 3000;
const rootDir = process.cwd();

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getBaseUrl(req: Request): string {
  const envUrl = process.env.APP_URL?.trim();
  if (envUrl && /^https?:\/\//i.test(envUrl) && !envUrl.includes('MY_APP_URL')) {
    return envUrl.replace(/\/+$/, '');
  }
  const forwardedProto = (req.headers['x-forwarded-proto'] as string | undefined)?.split(',')[0]?.trim();
  const forwardedHost = (req.headers['x-forwarded-host'] as string | undefined)?.split(',')[0]?.trim();
  const proto = forwardedProto || req.protocol || 'https';
  const host = forwardedHost || req.get('host') || `localhost:${port}`;
  return `${proto}://${host}`.replace(/\/+$/, '');
}

function buildSeoHeadTags(baseUrl: string): string {
  const safeBase = escapeAttr(baseUrl);
  const ogImage = `${safeBase}/assets/aistudio/zubair-sitecraft_3af9bc81.jpeg`;
  return [
    `<link rel="canonical" href="${safeBase}/" />`,
    `<meta property="og:url" content="${safeBase}/" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:alt" content="Zubair Akram — Framer Website Designer & Founder of Site Craft Studio" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n    ');
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  // Baseline security & crawl headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-DNS-Prefetch-Control', 'on');
    next();
  });

  // Dynamic robots.txt with full Sitemap URL
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    res.type('text/plain');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(
      `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    );
  });

  // Dynamic XML Sitemap for search engine indexing
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = escapeAttr(getBaseUrl(req));
    const today = new Date().toISOString().split('T')[0];
    res.type('application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, mode: isProduction ? 'ssg-ssr' : 'ssr-dev' });
  });

  let vite: Awaited<ReturnType<typeof import('vite')['createServer']>> | undefined;
  let prodTemplate = '';
  let prodRender: (() => string) | undefined;

  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const clientDist = path.join(rootDir, 'dist', 'client');
    const serverEntry = path.join(rootDir, 'dist', 'server', 'entry-server.js');
    const htmlPath = path.join(clientDist, 'index.html');

    if (fs.existsSync(htmlPath)) {
      prodTemplate = fs.readFileSync(htmlPath, 'utf-8');
    }
    if (fs.existsSync(serverEntry)) {
      const mod = (await import(pathToFileURL(serverEntry).href)) as {
        render: () => string;
      };
      prodRender = mod.render;
    }

    app.use(
      '/assets',
      express.static(path.join(clientDist, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );
    app.use(
      express.static(clientDist, {
        index: false,
        maxAge: '1d',
      })
    );
  }

  // SSR / SSG page route
  app.use('*', async (req: Request, res: Response, next) => {
    if (req.originalUrl.startsWith('/api/')) {
      return next();
    }

    try {
      const baseUrl = getBaseUrl(req);
      const seoHead = buildSeoHeadTags(baseUrl);

      let html = '';
      if (!isProduction && vite) {
        const rawTemplate = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
        const transformedTemplate = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
        const mod = (await vite.ssrLoadModule('/src/entry-server.tsx')) as {
          render: () => string;
        };
        const appHtml = mod.render();
        html = transformedTemplate
          .replace('<!--ssr-head-->', seoHead)
          .replace('<!--ssr-html-->', appHtml);
      } else {
        html = prodTemplate;
        if (html.includes('<!--ssr-html-->') && prodRender) {
          html = html.replace('<!--ssr-html-->', prodRender());
        }
        if (html.includes('<!--ssr-head-->')) {
          html = html.replace('<!--ssr-head-->', seoHead);
        }
      }

      res.status(200);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Robots-Tag', 'index, follow');
      res.setHeader('Cache-Control', isProduction ? 'public, max-age=300, stale-while-revalidate=86400' : 'no-cache');
      res.send(html);
    } catch (err) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(err as Error);
      }
      next(err);
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Site Craft Studio (${isProduction ? 'SSG+SSR' : 'SSR Dev'}) running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
