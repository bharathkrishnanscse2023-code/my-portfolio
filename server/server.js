import app from './src/app.js';
import { config } from './src/config.js';
import { logger } from './src/utils/logger.js';

const server = app.listen(config.port, () => {
  logger.info(`BK.sys API online → http://localhost:${config.port}/api`);
  logger.info(`CORS origin allowed: ${config.clientOrigin}`);
  if (!config.smtp.user || config.smtp.user === 'your-email@gmail.com') {
    logger.warn('SMTP not configured — emails will be logged to console only. See server/.env');
  }
});

// graceful shutdown
['SIGINT', 'SIGTERM'].forEach((sig) =>
  process.on(sig, () => {
    logger.info(`${sig} received, shutting down.`);
    server.close(() => process.exit(0));
  })
);
