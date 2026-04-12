import pino from 'pino';

import type { Logger, LoggerOptions } from 'pino';

type CreateLoggerOptions = LoggerOptions & {
  name: string;
};

/// Creates a logger instance using the Pino library. The logger is configured based on the provided options and the environment. In development mode, it uses a pretty-printing transport for better readability.
export const createLogger = (options: CreateLoggerOptions): Logger => {
  const { name, ...rest } = options;

  const transport =
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        }
      : undefined;

  return pino({
    name,
    level: process.env.LOG_LEVEL || 'info',
    transport,
    ...rest,
  });
};
