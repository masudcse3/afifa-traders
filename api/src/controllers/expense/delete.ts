/** @format */

import { Request, Response, NextFunction } from "express";
import { deleteExpensesService } from "@/services/expense";
import { fireEvent } from "@/utils/fireEvent";

export const deleteExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { id: userId } = req["user"];
    const deleted = await deleteExpensesService(id);
    if (!deleted) {
      return res.status(403).json({ message: "failed to delete expense" });
    }

    // fire an event to update the main account
    const accountPayload = {
      balance: deleted.amount,
      source: "Expense",
      madeBy: userId,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    res.status(204).json({ message: "Expense Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
