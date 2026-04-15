import type { Router } from 'express';
import { authRouter } from '@/routes/auth.routes';

export const registerRoutes = (app: Router): void => {
  app.use('/auth', authRouter);
};
