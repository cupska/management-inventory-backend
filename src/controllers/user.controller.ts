import { Request, Response } from "express";
import { usernameExistCheck } from "../models/user.model";
import { formatError, formatResponse } from "../utils/formatResponse";

export const usernameChecker = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const isUsernameExist = await usernameExistCheck(username);
    const resMsg = isUsernameExist
      ? "Username tidak tersedia"
      : "Username tersedia";
    formatResponse(
      res,
      { username: { isExist: isUsernameExist } },
      resMsg,
      200
    );
  } catch (error) {}
};
