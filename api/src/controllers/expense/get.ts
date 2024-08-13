/** @format */

import { Request, Response, NextFunction } from "express";
import { getExpensesService } from "@/services/expense";

export const allExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { from, to, madeBy } = req.query;
  try {
    const allExpenses = await getExpensesService({ from, to, madeBy });
    res.status(200).json(allExpenses);
  } catch (error) {
    next(error);
  }
};
