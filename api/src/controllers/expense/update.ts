/** @format */

import { Request, Response, NextFunction } from "express";
import { updateExpenseSerive } from "@/services/expense";
import { updateExpenseSchema } from "@/schemaValidation/expense";

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = updateExpenseSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { id } = req.params;
    const { title, amount, extra }: any = parseData.data;
    const { id: userId } = req["user"];

    const expense = await updateExpenseSerive({
      id,
      title,
      amount,
      extra,
      userId,
    });
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
};
