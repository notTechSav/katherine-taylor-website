import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
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
  plugins: [expressPlugin(), sitemapPlugin(), react()],
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
