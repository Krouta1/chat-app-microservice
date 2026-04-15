import { z } from '@chat-app-microservice/common';

export const registerSchema = z.object({
  body: z.object({
    displayName: z.string().min(1, 'Display name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export const revokeTokenSchema = z.object({
  body: z.object({
    userId: z.string().uuid('Invalid user ID'),
  }),
});
