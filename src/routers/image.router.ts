import { Router } from "express";
import { upload } from "../middleware/upload";
import { SUCCESS_CREATED_MSG, SUCCESS_UPLOAD_MSG } from "../constants";
import imageController from "../controllers/image.controller";
import { validateForm } from "../middleware/validator";
import { imageValidation } from "../libs/zod/validations";
import multer from "multer";

const imageRouter = Router();

imageRouter.post("/api/image", upload.single("image"), (req, res, next) => {
  console.log(req.file, req.body);
  res.status(201).json({ message: SUCCESS_UPLOAD_MSG });
  // next();
});
export default imageRouter;
