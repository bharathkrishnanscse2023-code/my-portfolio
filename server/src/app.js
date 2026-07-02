import express from 'express';
import cors from 'cors';
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

// serve the built React client (production single-service deploy)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDist));
// SPA fallback: any non-/api route returns index.html
app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));

export default app;
