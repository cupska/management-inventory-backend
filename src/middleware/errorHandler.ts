import { timeStamp } from "console";
import { config } from "dotenv";
config();
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export type ErrorPayloadType = {
  stack?: unknown;
  error?: unknown;
  status?: number;
  message?: string;
  timestamp?: Date;
};
const initialError = {
  message: "telah terjadi kesalahan",
  status: 500,
} satisfies ErrorPayloadType;
export const errorHandler = (
  err: ErrorRequestHandler & ErrorPayloadType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDev = process.env.NODE_ENV === "development" || "test";
  const { error } = err;
  const resPayload = {
    message: err.message || initialError.message,
    error,
    timestamp: new Date(),
    ...(isDev && { stack: err.stack }),
  } satisfies ErrorPayloadType;
  isDev && console.error(resPayload); // Menampilkan stack trace di console
  res.status(err.status || initialError.status).json(resPayload);
};
