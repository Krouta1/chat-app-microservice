import { z } from 'zod';
import { AnyZodObject, ZodError, ZodTypeAny } from 'zod';
import { HttpError } from '../errors/http-error';
import type { NextFunction, Request, Response } from 'express';

type ValidationSchema = AnyZodObject | ZodTypeAny;
type ParamsRecord = Record<string, string>;
type QueryRecord = Record<string, unknown>;

export interface RequestValidationSchemas {
  params?: ValidationSchema;
  query?: ValidationSchema;
  body?: ValidationSchema;
}

const formatZodError = (error: ZodError) => {
  return error.errors.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
};

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const parsedBody = schemas.body.parse(req.body) as unknown;
        req.body = parsedBody;
      }
      if (schemas.params) {
        const parsedParams = schemas.params.parse(req.params) as ParamsRecord;
        req.params = parsedParams as Request['params'];
      }
      if (schemas.query) {
        const parsedQuery = schemas.query.parse(req.query) as QueryRecord;
        req.query = parsedQuery as Request['query'];
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = formatZodError(error);
        next(new HttpError(422, 'Validation Error', { errors: formattedError }));
      } else {
        next(error);
      }
    }
  };
};
