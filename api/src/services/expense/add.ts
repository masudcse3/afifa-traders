/** @format */

import { Expense } from "@/model";

export const addExpenseService = async ({
  title,
  amount,
  extra,
  userId,
  madeBy,
}: {
  title: string;
  amount: number;
  extra: boolean;
  userId: string;
  madeBy: string;
}) => {
  // create a new expense record

  const expense = new Expense({
    title,
    amount,
    extra,
    userId,
    madeBy,
  });
  await expense.save();

  return expense;
};
