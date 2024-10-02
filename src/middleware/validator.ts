import { NextFunction, Request, RequestHandler, Response } from "express";
import { z, ZodError } from "zod";
import { ErrorPayloadType } from "./errorHandler";

/**
 * @param validation gunakan validation zod {@link  src/libs/zod/validations.ts} */
export function validateForm(validation: z.AnyZodObject): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      validation.parse(body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorPayload = {
          status: 400,
          error: error.errors.reduce(
            (prev: { [x: string]: { message: string } }[], curr) => {
              prev.push({ [curr.path[0]]: { message: curr.message } });
              return prev;
            },
            []
          ),
          message:
            "kesalahan validasi pada " +
            error.errors.reduce((prev, curr, currIndex, arr) => {
              const identity = curr.path[0];
              prev +=
                currIndex === 0 && arr.length <= 2
                  ? `${identity} `
                  : currIndex === arr.length - 1
                  ? `dan ${identity}`
                  : `${identity}, `;
              return prev;
            }, ""),
          stack: error.stack,
        } satisfies ErrorPayloadType;

        next(errorPayload);
      }
    }
  };
}
