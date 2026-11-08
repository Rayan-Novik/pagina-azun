import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  server: {
    port: 3002,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        api: resolve(__dirname, 'api.html'),
        downloads: resolve(__dirname, 'downloads.html')
      }
    }
  },
  plugins: [
    {
      name: 'apk-mime',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.endsWith('.apk')) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', `attachment; filename="${req.url.split('?')[0].split('/').pop()}"`);
          }
          next();
        });
      }
    },
    {
      name: 'copy-downloads',
      closeBundle() {
        const src = resolve(__dirname, 'downloads');
        const dest = resolve(__dirname, 'dist/downloads');
        if (fs.existsSync(src)) {
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          fs.cpSync(src, dest, { recursive: true });
          console.log('[VITE] Pasta downloads copiada para dist/downloads com sucesso.');
        }
      }
    }
  ]
});
