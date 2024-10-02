import { NextFunction, Request, Response } from "express";
import imageModel from "../models/image.model";
import { SUCCESS_CREATED_MSG } from "../constants";
import sharp from "sharp";

const addImage = async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  try {
    if (!file) throw new Error("Masalah dengan gambar yang diupload");
    file.buffer = await sharp(file.buffer)
      .webp({ quality: 70, lossless: true })
      .toBuffer();
    const { rows } = await imageModel.addImage(file);
    res.status(201).json({ message: SUCCESS_CREATED_MSG, data: rows[0] });
  } catch (error) {
    error instanceof Error &&
      error.name === "upload" &&
      next({ status: 400, message: error.message });
    next(error);
  }
};

const imageController = { addImage };
export default imageController;
