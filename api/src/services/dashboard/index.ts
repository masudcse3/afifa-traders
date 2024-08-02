/** @format */

import { Account, Stock, Expense, Loaner } from "@/model";
import axios from "axios";
export const dashboardService = async () => {
  const accounts = await Account.findOne();
  const stocks = await Stock.find({ weight: { $gte: 1 } });
  const expenses = await Expense.find({ isUsed: false });
  const loans = await Loaner.find({ amount: { $gte: 1 } });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const expensesToday = await Expense.find({
    $and: [{ updatedAt: { $gte: today, $lt: nextDay } }, { isUsed: false }],
  });

  return {
    accounts,
    stocks,
    expenses,
    expensesToday,
    loans,
  };
};
