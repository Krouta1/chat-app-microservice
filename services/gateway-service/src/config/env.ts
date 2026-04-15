import 'dotenv/config';

import { createEnv, z } from '@chat-app-microservice/common';

// Define the schema for environment variables using Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GATEWAY_SERVICE_PORT: z.coerce.number().int().min(0).max(65535).default(4000),
  AUTH_SERVICE_URL: z.string().url().default('http://localhost:4003'),
  INTERNAL_API_TOKEN: z.string().min(16).default('your_secure_token_here'),
});

// Infer the TypeScript type from the Zod schema
type EnvType = z.infer<typeof envSchema>;

// Create the environment configuration using the schema and provide default values
export const env: EnvType = createEnv(envSchema, {
  serviceName: 'gateway-service',
});

export type Env = typeof env;
