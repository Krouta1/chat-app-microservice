import { HttpError } from '../errors/http-error';

import type { RequestHandler } from 'express';

export interface InternalAuthOptions {
  headerName?: string;
  exceptPaths?: string[]; // paths that skips auth
}

const DEFAULT_HEADER_NAME = 'x-internal-token';

export const createInternalAuthMiddleware = (
  expectedToken: string,
  options: InternalAuthOptions = {},
): RequestHandler => {
  const headerName = options.headerName?.toLocaleLowerCase() ?? DEFAULT_HEADER_NAME;
  const exceptPaths = new Set(options.exceptPaths ?? []);
  return (req, res, next) => {
    if (exceptPaths.has(req.path)) {
      next();
      return;
    }

    const provided = req.headers[headerName];
    const token = Array.isArray(provided) ? provided[0] : provided;
    if (typeof token !== 'string' || token !== expectedToken) {
      next(new HttpError(401, 'Unauthorized'));
      return;
    }
    next();
  };
};
