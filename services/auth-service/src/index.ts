import { createApp } from '@/app';
import { createServer } from 'http';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';
import { connectToDatabase } from '@/db/sequelize';
import { initModels } from '@/models';

// Main function to start the auth service
const main = async () => {
  try {
    // Connect to the database and initialize models
    await connectToDatabase();
    await initModels();

    // Create the Express app and HTTP server
    const app = createApp();
    const server = createServer(app);

    const port = env.AUTH_SERVICE_PORT;
    server.listen(port, () => {
      logger.info({ port }, `Auth service is running on port ${port}`);
    });

    // Shutdown handler to stop the server
    const shutdown = async () => {
      logger.info('Shutting down auth service...');
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
    logger.error({ error }, 'Failed to start the auth service');
    process.exit(1);
  }
};

void main();
