import type { Request, Response, NextFunction, RequestHandler } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const toError = (err: unknown): Error => {
  return err instanceof Error ? err : new Error(String(err));
};

type ErrorForwarder = (err: unknown, nextFn: NextFunction) => void;
const forwardError: ErrorForwarder = (err, nextFn) => {
  nextFn(toError(err));
};

// Wraps an async request handler and forwards any errors to the next middleware
export const asyncHandler = (handler: AsyncRequestHandler): RequestHandler => {
  return (req, res, next) => {
    void handler(req, res, next).catch((err: unknown) => forwardError(err, next));
  };
};
