/** @format */

import { Request, Response, NextFunction } from "express";
import { addExpenseService } from "@/services/expense";
import { expenseSchema } from "@/schemaValidation/expense";
import { fireEvent } from "@/utils/fireEvent";
export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = expenseSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { title, amount, extra } = parseData.data as {
      title: string;
      amount: number;
      extra: boolean;
    };
    const { id, name } = req["user"];
    const expense = await addExpenseService({
      title,
      amount,
      extra,
      userId: id,
      madeBy: name,
    });
    if (!expense) {
      return res.status(403).json({ message: "failed to add expense" });
    }

    // fire an event to update the main account
    const accountPayload = {
      balance: -amount,
      source: "Expense",
      madeBy: id,
      addedBy: id,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};
