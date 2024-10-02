import { Router } from "express";
import { validateForm } from "../middleware/validator";
import { ItemValidation } from "../libs/zod/validations";
import * as itemController from "../controllers/item.controller";

const itemRouter = Router();
itemRouter.post(
  "/api/item",
  validateForm(ItemValidation),
  itemController.addOneItem
);
itemRouter.put(
  "/api/items/:itemId",
  validateForm(ItemValidation.omit({ id: true }).partial()),
  itemController.updateOneItem
);
itemRouter.get("/api/items", itemController.getAllItems);
itemRouter.get("/api/items/:itemId", itemController.getOneItems);

export default itemRouter;
