/** @format */

import { Loaner, PayLoan } from "@/model";
export const payLoanService = async ({
  id,
  amount,
  paidBy,
  addedBy,
}: {
  id: string;
  amount: number;
  paidBy: string;
  addedBy: string;
}) => {
  // check the loan exists
  const loan: any = await Loaner.findById(id);
  if (!loan) {
    return false;
  }
  // update the loan amount
  loan.amount -= amount;
  // create a payloan record
  const payLoan = new PayLoan({ loaner: id, paidBy, addedBy, amount });
  await loan.save();
  await payLoan.save();
  return payLoan;
};
