import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "path";
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createServer } from "./server";
import {
  applyRouteHead,
  getPrerenderRoutes,
  notFoundHead,
  prerenderOutputPath,
} from "./client/lib/route-head";
import { SITE_URL } from "./client/lib/site-config";
import { renderSitemap } from "./client/lib/site-pages";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    // Dedicated port: default 8080 is often another local Vite app (missing POST /api/inquiry).
    port: 8082,
    strictPort: true,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
          ],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
  plugins: [expressPlugin(), sitemapPlugin(), prerenderHtmlPlugin(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    enforce: "pre",
    configureServer(server) {
      // Deleted Cartier/template mark. Intercept before Vite's SPA fallback
      // so /logo.svg cannot paint a full-page icon during local first load.
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] !== "/logo.svg") {
          next();
          return;
        }
        res.statusCode = 301;
        res.setHeader("Location", "/");
        res.end();
      });
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}

/**
 * Builds sitemap.xml from client/lib/site-pages.ts rather than a checked-in
 * file, so the sitemap cannot fall out of step with the footer nav.
 */
function sitemapPlugin(): Plugin {
  return {
    name: "sitemap-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] !== "/sitemap.xml") {
          next();
          return;
        }
        res.setHeader("Content-Type", "application/xml");
        res.end(renderSitemap(SITE_URL));
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: renderSitemap(SITE_URL),
      });
    },
  };
}

/**
 * Writes per-route HTML files so crawlers receive page-specific metadata
 * and meaningful body markup in the first byte. Uses `.html` files (not
 * `/path/index.html`) so Cloudflare Pages pretty-URLs stay slash-free.
 * A top-level 404.html disables Pages' SPA fallback and returns HTTP 404.
 */
function prerenderHtmlPlugin(): Plugin {
  return {
    name: "prerender-html",
    apply: "build",
    async writeBundle() {
      const outDir = path.resolve(__dirname, "dist/spa");
      const indexPath = path.join(outDir, "index.html");
      const html = await readFile(indexPath, "utf8");
      const { createServer: createViteServer } = await import("vite");
      const prerenderServer = await createViteServer({
        configFile: false,
        root: path.resolve(__dirname),
        appType: "custom",
        mode: "production",
        server: { middlewareMode: true },
        plugins: [
          react({
            useAtYourOwnRisk_mutateSwcOptions(swcOptions) {
              if (swcOptions.jsc?.transform?.react) {
                swcOptions.jsc.transform.react.development = false;
              }
            },
          }),
        ],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./client"),
            "@shared": path.resolve(__dirname, "./shared"),
          },
        },
        ssr: {
          noExternal: ["react-helmet-async"],
        },
      });

      try {
        const { applyRouteBody } = await prerenderServer.ssrLoadModule(
          "/client/lib/route-body.tsx",
        );

        for (const route of getPrerenderRoutes()) {
          const rendered = applyRouteBody(
            applyRouteHead(html, route),
            route.path,
          );
          const relative = prerenderOutputPath(route.path);
          const dest = path.join(outDir, relative);
          await mkdir(path.dirname(dest), { recursive: true });
          await writeFile(dest, rendered);
        }

        await writeFile(
          path.join(outDir, "404.html"),
          applyRouteBody(applyRouteHead(html, notFoundHead), notFoundHead.path),
        );
      } finally {
        await prerenderServer.close();
      }
    },
  };
}
