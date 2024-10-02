import multer from "multer";
import { MAX_IMAGE_UPLOAD } from "../constants";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: MAX_IMAGE_UPLOAD, fileSize: MAX_IMAGE_UPLOAD },
});
