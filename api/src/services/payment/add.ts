/** @format */

import { Payment } from "@/model";
import { Party, ShareHolder } from "@/model";

export const addPaymentService = async ({
  sales,
  party,
  payTo,
  amount,
  method,
  bank,
  checkNo,
}: {
  sales: String;
  party: String;
  payTo: String;
  amount: Number;
  method: String;
  bank: String;
  checkNo: String;
}) => {
  // check if the party axists
  const partyExist = await Party.findById(party);
  if (!partyExist) {
    throw new Error("Party does not exist");
  }
  // check payTo axists
  const payToExist = await ShareHolder.findById(payTo);
  if (!payToExist) {
    throw new Error("PayTo does not exists.");
  }
  // create a new payment record
  const payment = new Payment({
    sales,
    party,
    payTo,
    amount,
    method,
    bank,
    checkNo,
  });
  await payment.save();

  return { payment };
};
