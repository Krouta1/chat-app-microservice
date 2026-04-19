import 'dotenv/config';

import { createEnv, z } from '@chat-app-microservice/common';

// Define the schema for environment variables using Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  USER_SERVICE_PORT: z.coerce.number().int().min(0).max(65535).default(4001),
  USER_DB_URL: z.string().url(),
  RABBITMQ_URL: z.string().url().optional(),
  INTERNAL_AUTH_TOKEN: z.string().min(32),
});

// Infer the TypeScript type from the Zod schema
type EnvType = z.infer<typeof envSchema>;

// Create the environment configuration using the schema and provide default values
export const env: EnvType = createEnv(envSchema, {
  serviceName: 'user-service',
});

export type Env = typeof env;
