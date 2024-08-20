/** @format */

import { Account, Stock, Expense, Loaner } from "@/model";

export const dashboardService = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const thisMonth = `${today.getFullYear()}-${today.getMonth() + 1}-01`;

  const accounts = await Account.findOne();
  const stocks = await Stock.find({ weight: { $gte: 1 } });
  const expenses = await Expense.find({ createdAt: { $gte: thisMonth } });
  const loans = await Loaner.find({ amount: { $gte: 1 } });

  const expensesToday = await Expense.find({
    $and: [{ createdAt: { $gte: today, $lt: nextDay } }],
  });

  return {
    accounts,
    stocks,
    expenses,
    expensesToday,
    loans,
  };
};
