/** @format */

import { Request, Response, NextFunction } from "express";
import { dashboardService } from "@/services/dashboard";

export const dashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accounts, stocks, expenses, loans, expensesToday } =
      await dashboardService();
    res.json({ accounts, stocks, expenses, loans, expensesToday });
  } catch (error) {
    next(error);
  }
};
