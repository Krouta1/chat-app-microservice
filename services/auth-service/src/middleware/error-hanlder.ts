import { HttpError } from "@chat-app-microservice/common";
import { ErrorRequestHandler } from "express";
import { logger } from "@/utils/logger";

// Centralized error handling middleware for auth-service
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error({ err }, "Error occurred while processing request");

  const error = err instanceof HttpError ? err : undefined;
  const statusCode = error ? error.statusCode : 500;
  const message = error ? error.message : "Internal Server Error";
  const payload = error?.details
    ? { message, details: error.details }
    : { message };

  res.status(statusCode).json({
    ...payload,
  });

  void _next();
};
