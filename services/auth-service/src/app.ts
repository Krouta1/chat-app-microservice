import express, { Application } from "express";

export const createApp = (): Application => {
  const app = express();

  return app;
};
