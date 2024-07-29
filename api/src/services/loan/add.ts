/** @format */

import { Loaner, Loan } from "@/model";

export const addLoanService = async ({
  loaner,
  receiver,
  amount,
}: {
  loaner: string;
  receiver: string;
  amount: number;
}) => {
  try {
    // check the loaner exists
    const loanerExists = await Loaner.findById(loaner);
    if (!loanerExists) {
      return false;
    }
    // add a new loan
    const loan = new Loan({
      loaner,
      receiver,
      amount,
    });
    loanerExists.amount += amount;
    await loan.save();
    await loanerExists.save();

    return loan;
  } catch (error) {
    console.error("Loan added Error:", error);
  }
};
