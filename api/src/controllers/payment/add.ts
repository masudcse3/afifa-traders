/** @format */

import { Request, Response, NextFunction } from "express";
import { addPaymentService } from "@/services/payment";
import { addPaymentSchema } from "@/schemaValidation/payment";
import { fireEvent } from "@/utils/fireEvent";
export const addPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate the request body
    const parseData = addPaymentSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { id: userId } = req["user"];
    const { sales, party, payTo, amount, method, bank, checkNo }: any =
      parseData.data;
    const { payment } = await addPaymentService({
      sales,
      party,
      payTo,
      amount,
      method,
      bank,
      checkNo,
    });
    if (!payment) {
      return res.status(403).json({ message: "failed to add payment" });
    }

    // fire an event to update party's due
    const duePayload = {
      party: party,
      due: -amount,
    };
    await fireEvent("update-due", "update-due", JSON.stringify(duePayload));
    // fire an event to update the main account
    const accountPayload = {
      balance: amount,
      type: method,
      source: "Payment",
      bank: bank,
      checkNo: checkNo,
      madeBy: payTo,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    const dueReduceFromAccountPayload = {
      balance: -amount,
      type: "Due",
      source: "Payment",
      madeBy: payTo,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(dueReduceFromAccountPayload)
    );
    // fire an event to update the relavant sales
    const salesUpdatePayload = {
      sales: sales,
      amount: amount,
    };
    await fireEvent(
      "update-sales",
      "update-sales",
      JSON.stringify(salesUpdatePayload)
    );
    return res
      .status(201)
      .json({ message: "payment added successfully", payment });
  } catch (error) {
    next(error);
  }
};
