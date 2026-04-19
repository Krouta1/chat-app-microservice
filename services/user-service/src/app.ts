import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from '@/middleware/error-hanlder';
// import { registerRoutes } from '@/routes';
import { createInternalAuthMiddleware } from '@chat-app-microservice/common/src/http/internal-auth';
import { env } from './config/env';
//import { env } from './config/env';

export const createApp = (): Application => {
  const app = express();

  // middleware
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  // body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    createInternalAuthMiddleware(env.INTERNAL_AUTH_TOKEN, { exceptPaths: ['/users/health'] }),
  );

  //registerRoutes(app);

  // for api route that i don't have
  app.use((_req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  app.use(errorHandler);

  return app;
};
