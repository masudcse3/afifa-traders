/** @format */

import { Request, Response, NextFunction } from "express";
import { calculateProfitService } from "@/services/profit";

export const calculateProfit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profit = await calculateProfitService({ id: req.params.id });
    res.status(200).json({
      profit,
    });
  } catch (error) {
    next(error);
  }
};
