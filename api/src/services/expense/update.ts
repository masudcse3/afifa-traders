/** @format */

import { Expense } from "@/model";
import { fireEvent } from "@/utils/fireEvent";

export const updateExpenseSerive = async ({
  id,
  title,
  amount,
  extra,
  userId,
}: any) => {
  // check the expense exits
  const expense: any = await Expense.findById(id);
  if (!expense) {
    throw new Error("Expense not found");
  }
  const updatedAmount = (amount || expense.amount) - expense.amount;

  // update the expense

  const updatedExpense: any = await Expense.findByIdAndUpdate(
    id,
    {
      title: title !== undefined ? title : expense.title,
      amount: amount !== undefined ? amount : expense.amount,
      extra: extra !== undefined ? extra : expense.extra,
    },
    { new: true }
  );

  await updatedExpense.save();
  // fire an event to update the account
  const accountPayload = {
    balance: -updatedAmount,
    source: "Expense",
    madeBy: userId,
    addedBy: userId,
  };
  await fireEvent(
    "update-account",
    "update-account",
    JSON.stringify(accountPayload)
  );

  return updatedExpense;
};
