import { NextFunction, Request, Response, Router } from "express";
import { Product } from "../types";
import { validateForm } from "../middleware/validator";
import { productValidation } from "../libs/zod/validations";
import db from "../../database/db";
import { upload } from "../middleware/upload";
import { SUCCESS_CREATED_MSG } from "../constants";
import productController from "../controllers/product.controller";

const productRouter = Router();
productRouter.post(
  "/api/product",
  validateForm(
    productValidation.omit({ id: true, updated_at: true, created_at: true })
  ),
  productController.addProduct
);

productRouter.delete(
  "/api/product/:productId",
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { productId },
    } = req;
    const { query } = db;
    try {
      await query("BEGIN");
      const image_name = await query(
        "SELECT image FROM public.product WHERE id = $1",
        [productId]
      );
      await query("DELETE FROM public.image WHERE name = $1", [image_name]);
      await query("DELETE FROM public.product WHERE id = $1", [productId]);
      await query("COMMIT");
      res.status(200).json({ message: "berhasil hapus produk" });
    } catch (error) {
      await query("ROLLBACK");
      next(error);
      // throw error;
    }
  }
);

export default productRouter;
