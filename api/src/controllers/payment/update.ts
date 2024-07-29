/** @format */

import { Request, Response, NextFunction } from "express";
import { updatePaymentService } from "@/services/payment";
import { updatePaymentSchema } from "@/schemaValidation/payment";
import { fireEvent } from "@/utils/fireEvent";
export const updatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { id: userId } = req["user"];
    // validate the request body
    const parseData = updatePaymentSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { payTo, amount, method, bank, checkNo } = parseData.data as {
      payTo: string;
      amount: number;
      method: string;
      bank: string;
      checkNo: string;
    };
    const { payment, updatedPayment } = await updatePaymentService({
      id,
      payTo,
      amount,
      method,
      bank,
      checkNo,
    });
    if (!updatedPayment) {
      return res.status(403).json({ message: "failed to update payment" });
    }
    // fire an event to update the party's due

    const duePayload = {
      party: payment.party,
      due: payment.amount - updatedPayment.amount,
    };
    await fireEvent("update-due", "update-due", JSON.stringify(duePayload));
    // fire an event to update the main account
    //  2000 1000
    const accountPayload = {
      balance: updatedPayment.amount - payment.amount,
      type: method,
      source: "Payment",
      madeBy: payTo,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    const dueReduceFromAccountPayload = {
      balance: payment.amount - updatedPayment.amount,
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
    const salesUpdatePayload = {
      sales: payment.sales,
      amount: amount - payment.amount,
    };
    await fireEvent(
      "update-sales",
      "update-sales",
      JSON.stringify(salesUpdatePayload)
    );
    return res
      .status(200)
      .json({ message: "payment updated successfully", updatedPayment });
  } catch (error) {
    next(error);
  }
};
