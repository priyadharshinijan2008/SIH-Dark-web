import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './backend/routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API router
  app.use('/api', apiRouter);

  // Serve demo video placeholder or demo assets
  app.use('/demo', express.static(path.resolve(__dirname, 'public/demo')));

  if (!isProd) {
    // Development mode: attach Vite dev server middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`[SOC INTEL] Dark Web Threat Actor De-anonymization Server`);
    console.log(`[STATUS] Listening on http://0.0.0.0:${PORT}`);
    console.log(`[SYNTHETIC SEED] 24 Actors, 68 Handles, 18 PGP Keys, 31 Wallets, 42 Infra, 38 Sources, 180+ Relationships`);
    console.log(`[DISCLAIMER] Academic Cybersecurity Demonstration System - Synthetic Data Only`);
    console.log(`=======================================================`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
