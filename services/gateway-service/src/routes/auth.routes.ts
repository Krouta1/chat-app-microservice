import { registerUser } from '@/controllers/auth.controller';
import { registerSchema } from '@/validation/auth.schema';
import { AsyncHandler, validateRequest } from '@chat-app-microservice/common';
import { Router } from 'express';

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({ body: registerSchema }), AsyncHandler(registerUser));
