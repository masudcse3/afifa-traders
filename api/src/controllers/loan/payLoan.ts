/** @format */

import { Request, Response, NextFunction } from "express";
import { payLoanService } from "@/services/loan";
import { payLoanSchema } from "@/schemaValidation/loan";
import { fireEvent } from "@/utils/fireEvent";
export const payLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { id: userId } = req["user"];
    const parseData = payLoanSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { amount, paidBy } = parseData.data;
    const loan = await payLoanService({ id, amount, paidBy, addedBy: userId });
    if (!loan) {
      return res
        .status(404)
        .json({ message: "No loan found to pay.", code: 404 });
    }

    // fire an event to update account
    const accountUpdatePayload = {
      balance: -amount,
      type: "Cash",
      source: "Loan",
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountUpdatePayload)
    );
    res.status(200).json({ message: "Loan paid successfull.", loan });
  } catch (error) {
    next(error);
  }
};
