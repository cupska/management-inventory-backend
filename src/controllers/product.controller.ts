import { NextFunction, Request, Response } from "express";
import { Product } from "../types";
import productModel from "../models/product.model";
import { SUCCESS_CREATED_MSG } from "../constants";
("../models/product.model");

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    await productModel.addProduct(body);
    res.status(201).json({ message: SUCCESS_CREATED_MSG });
  } catch (error) {
    next(error);
  }
};

const productController = { addProduct };
export default productController;
