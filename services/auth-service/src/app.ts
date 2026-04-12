import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";

export const createApp = (): Application => {
  const app = express();

  // middleware
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: "*",
      credentials: true,
    }),
  );

  // body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // for api route that i don't have
  app.use((_req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  return app;
};
