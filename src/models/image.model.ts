import { Request } from "express";
import db from "../../database/db";

const addImage = async (file: Request["file"]) => {
  try {
    if (!file) throw new Error("Masalah dengan gambar yang diupload");
    return await db.query(
      "INSERT INTO public.image (name, data) VALUES ($1,$2) RETURNING name",
      [file.originalname, file.buffer]
    );
  } catch (error) {
    throw error;
  }
};

const imageModel = { addImage };
export default imageModel;
