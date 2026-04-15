import { createApp } from '@/app';
import { createServer } from 'http';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

// Main function to start the gateway service
const main = async () => {
  try {
    // Create the Express app and HTTP server
    const app = createApp();
    const server = createServer(app);

    const port = env.GATEWAY_SERVICE_PORT;
    server.listen(port, () => {
      logger.info({ port }, `Gateway service is running on port ${port}`);
    });

    // Shutdown handler to stop the server
    const shutdown = async () => {
      logger.info('Shutting down gateway service...');
      Promise.all([])
        .catch((error) => {
          logger.error({ error }, 'Error during shutdown');
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    logger.error({ error }, 'Failed to start the gateway service');
    process.exit(1);
  }
};

void main();
