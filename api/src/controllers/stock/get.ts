/** @format */

import { Request, Response, NextFunction } from "express";
import { getStockService } from "@/services/stock";

export const getStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, product } = req.query as {
      category: string;
      product: string;
    };
    console.log(category, product);

    const stocks = await getStockService({ category, product });
    if (!stocks) {
      return res.status(404).json({ message: "No stock found" });
    }
    res.status(200).json(stocks);
  } catch (error) {
    next(error);
  }
};
