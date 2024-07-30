/** @format */

import { Account, Stock, Expense, Loaner } from "@/model";
import axios from "axios";
export const dashboardService = async () => {
  const accounts = await Account.findOne();
  const stocks = await Stock.find({ weight: { $gte: 1 } });
  const expenses = await Expense.find({ isUsed: false });
  const loans = await Loaner.find({ amount: { $gte: 1 } });

  return {
    accounts,
    stocks,
    expenses,
    loans,
  };
};
