/** @format */

import { Expense } from "@/model";

export const deleteExpensesService = async (id: string) => {
  // check if the expenses exists
  const expense: any = await Expense.findById(id);
  if (!expense) {
    throw new Error("Expense not found");
  }
  // delete the expense
  await Expense.findByIdAndDelete(id);
  return expense;
};
