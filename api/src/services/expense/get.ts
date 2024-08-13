/** @format */

import { Expense } from "@/model";

export const getExpensesService = async ({ from, to, madeBy }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startMonth = `${today.getMonth() + 1}-01-${today.getFullYear()}`;
  const thisMonth = new Date(startMonth);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const query: any = {
    updatedAt: {
      $gte: from || thisMonth,
      $lte: to || nextDay,
    },
  };
  if (madeBy) {
    query.madeBy = madeBy;
  }
  const allExpenses = await Expense.find({ $and: query }).sort({
    updatedAt: -1,
  });

  return allExpenses;
};
