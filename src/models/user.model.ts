import db from "../../database/db";
import { ERR_DB_MSG } from "../constants";

export const usernameExistCheck = async (username: string) => {
  try {
    const { rows } = await db.query(
      `SELECT EXISTS(SELECT 1 FROM public."user" WHERE username = $1)`,
      [username]
    );
    return rows[0].exists as boolean;
  } catch (error) {
    console.error(error);
    throw new Error(ERR_DB_MSG);
  }
};
