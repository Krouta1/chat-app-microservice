import { register } from '@/services/auth.service';
import { RegisterInput } from '@/types/auth';
import { AsyncHandler } from '@chat-app-microservice/common';
import { RequestHandler } from 'express';

export const registerHandler: RequestHandler = AsyncHandler(async (req, res) => {
  const payload = req.body as RegisterInput;
  const tokens = await register(payload);
  res.status(201).json(tokens);
});
