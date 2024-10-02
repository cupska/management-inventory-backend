import { Response } from "express";

export const formatResponse = (
  res: Response,
  data: unknown,
  message: string,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    data,
    message,
  });
};

export const formatError = (
  res: Response,
  message: string,
  statusCode: number
) => {
  return res.status(statusCode).json({
    status: "error",
    error: {
      code: statusCode,
      message,
    },
  });
};
