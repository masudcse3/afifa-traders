/** @format */

import { Request, Response, NextFunction } from "express";
import { addLoanService } from "@/services/loan";
import { createLoan } from "@/schemaValidation/loan";
import { fireEvent } from "@/utils/fireEvent";
export const addLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = createLoan.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { loaner, receiver, amount } = parseData.data;
    const loan = await addLoanService({
      loaner,
      receiver,
      amount,
    });
    if (!loan) {
      return res.status(404).json({
        message: "No Loaner found",
        code: 404,
      });
    }
    // fire an event to update account
    const accountUpdatePayload = {
      balance: amount,
      type: "Cash",
      source: "Loan",
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountUpdatePayload)
    );
    res.status(201).json(loan);
  } catch (error) {
    next(error);
  }
};
