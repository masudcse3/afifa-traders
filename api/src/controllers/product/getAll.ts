/** @format */

import { Request, Response, NextFunction } from "express";
import { getProductsService } from "@/services/product";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
