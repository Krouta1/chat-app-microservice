import { createLogger } from "@chat-app-microservice/common";
import type { Logger } from "@chat-app-microservice/common";

// Create a logger instance for the auth-service
export const logger: Logger = createLogger({ name: "auth-service" });
