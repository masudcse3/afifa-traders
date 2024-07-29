/** @format */

import { Payment } from "@/model";
import { Party } from "@/model";

export const updatePaymentService = async ({
  id,
  payTo,
  amount,
  method,
  bank,
  checkNo,
}: {
  id: String;
  payTo: String;
  amount: Number;
  method: String;
  bank: String;
  checkNo: String;
}) => {
  // check if the payment exists
  const payment: any = await Payment.findById(id);
  if (!payment) {
    throw new Error("Payment does not exist");
  }

  // update the payment
  const updatedPayment: any = await Payment.findByIdAndUpdate(
    id,
    {
      payTo: payTo || payment.payTo,
      amount: amount || payment.amount,
      method: method || payment.method,
      bank: bank || payment.bank,
      checkNo: checkNo || payment.checkNo,
    },
    { new: true }
  );
  return { payment, updatedPayment };
};
