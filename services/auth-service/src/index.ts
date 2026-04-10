import { createApp } from "./app";
import { createServer } from "http";
import { env } from "./config/env";
import { logger } from "./utils/logger";

// Main function to start the auth service
const main = async () => {
  try {
    const app = createApp();
    const server = createServer(app);

    const port = env.AUTH_SERVICE_PORT;
    server.listen(port, () => {
      logger.info({ port }, `Auth service is running on port ${port}`);
    });
  } catch (error) {
    logger.error({ error }, "Failed to start the auth service");
    process.exit(1);
  }
};

void main();
