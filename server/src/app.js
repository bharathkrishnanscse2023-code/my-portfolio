import express from 'express';
import cors from 'cors';
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

app.use(notFound);
app.use(errorHandler);

export default app;
