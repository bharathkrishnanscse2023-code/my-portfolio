import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { logger } from './utils/logger.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

import contactRoutes from './routes/contact.js';
import feedbackRoutes from './routes/feedback.js';
import analyticsRoutes from './routes/analytics.js';
import statsRoutes from './routes/stats.js';

const app = express();

app.use(cors({ origin: config.clientOrigin, methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '64kb' }));

// lightweight request log
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'online', service: 'BK.sys API', ts: Date.now() }));

app.use('/api', apiLimiter);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/stats', statsRoutes);

// unknown /api routes → JSON 404
app.use('/api', notFound);
app.use('/api', errorHandler);

// serve the built React client only if it exists next to the server
// (single-service deploy). When the frontend is hosted separately (e.g. Vercel),
// the dist folder is absent and the server runs as an API-only service.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(path.join(clientDist, 'index.html'))) {
  app.use(express.static(clientDist));
  // SPA fallback: any non-/api route returns index.html
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
  logger.info(`Serving client build from ${clientDist}`);
} else {
  // API-only mode: friendly root response
  app.get('/', (_req, res) => res.json({ service: 'BK.sys API', status: 'online', mode: 'api-only' }));
  logger.info('No client build found → running API-only (frontend hosted separately)');
}

export default app;
