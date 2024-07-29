/**
 * step 1: get the last sale
 * step 2: get the relavant profit
 * step 3: get the expenses
 * step 4: calculate the total expense
 * step 5: calculate the profit/loss
 * step 6: update the profit and save
 *
 * @format
 */

import { Sales, Expense, Profit } from "@/model";
export const calculateProfitService = async ({ id }) => {
  // get the profit
  const profit: any = await Profit.findOne({ salesId: id });
  if (!profit) {
    const err: any = new Error("No profit found");
    err.status = 404;
    throw err;
  }
  if (profit.calculated) {
    return profit.populate({
      path: "expenses",
      select: "-_id title amount madeBy",
    });
  }
  // the last sale
  const sale: any = await Sales.findById(id);

  // get the expenses
  const query = [{ extra: false, isUsed: false }];
  const newExpenses = await Expense.find({
    $and: query,
  });
  // calculte the total expenses
  const newExpensesTotal = newExpenses.reduce(
    (total: number, expense: any) => total + expense.amount,
    0
  );
  // calculate the profit
  const totalExpenses = profit.expense + newExpensesTotal;
  const calcualteProfit = profit.profit - newExpensesTotal;

  if (calcualteProfit > 0) {
    profit.profit = calcualteProfit;
    profit.lose = 0;
  } else {
    profit.lose += Math.abs(calcualteProfit);
    profit.profit = 0;
  }
  profit.expense = totalExpenses;

  // update the expenses
  newExpenses.forEach(async (expense: any) => {
    expense.isUsed = true;
    expense.salesId = sale._id;
    profit.expenses.push(expense);
    await expense.save();
  });

  await profit.save();
  return profit.populate({
    path: "expenses",
    select: "-_id title amount madeBy",
  });
};
