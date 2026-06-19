import { logger } from '../utils/logger.js';

export const notFound = (req, res) =>
  res.status(404).json({ ok: false, error: `Route not found: ${req.method} ${req.url}` });

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({ ok: false, error: err.publicMessage || 'Something went wrong on the server.' });
};
