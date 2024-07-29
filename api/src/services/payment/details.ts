/** @format */

import { Payment, Party } from "@/model";
export const paymentDetailService = async (id: string) => {
  try {
    const payments = await Payment.find({ sales: id })
      .populate({ path: "payTo", select: "-_id name" })
      .select("-sales -payTo");
    if (!payments) {
      return false;
    }
    const party = await Party.findById(payments[0].party).select(
      "name millName address"
    );
    const total = payments.reduce(
      (total: number, payment: any) => (total += payment.amount),
      0
    );
    return {
      payments,
      party,
      total,
    };
  } catch (err) {
    console.error("Payment Details Error:", err);
  }
};
