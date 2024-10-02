import { NextFunction, Request, Response } from "express";
import * as itemModel from "../models/item.model";
import { SUCCESS_CREATED_MSG, SUCCESS_UPDATE_MSG } from "../constants";
import { ErrorPayloadType } from "../middleware/errorHandler";

const addOneItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    await itemModel.addOneItem(body);
    res.status(201).json({ message: SUCCESS_CREATED_MSG });
  } catch (error) {
    next(error);
  }
};
const updateOneItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body, params } = req;
  try {
    await itemModel.updateOneItem({ id: Number(params.itemId), ...body });
    res.status(200).json({ message: SUCCESS_UPDATE_MSG });
  } catch (error) {
    console.error(error);
    if (error)
      next({
        status: 400,
        message: SUCCESS_UPDATE_MSG,
        ...error,
      } satisfies ErrorPayloadType);
  }
};
const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await itemModel.getAllItems();
    res.status(200).json({ data: items });
  } catch (error) {
    next(error);
  }
};
const getOneItems = async (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  try {
    const item = await itemModel.getOneItem(params.itemId);
    res.status(200).json({ data: item });
  } catch (error) {
    next(error);
  }
};

export { addOneItem, updateOneItem, getAllItems, getOneItems };
