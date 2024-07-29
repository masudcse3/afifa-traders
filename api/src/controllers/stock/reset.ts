/** @format */

import { resetStockService } from "@/services/stock";
import { Request, Response, NextFunction } from "express";
export const resetStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const stock = await resetStockService(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found", error: stock });
    }
    res.status(200).json({ message: "Stock updated", stock });
  } catch (error) {
    next(error);
  }
};
