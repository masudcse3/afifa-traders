/** @format */

import { model, Schema } from "mongoose";
const payLoanSchema = new Schema(
  {
    loaner: {
      type: Schema.Types.ObjectId,
      ref: "Loaner",
      required: true,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "ShareHolder",
      required: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "ShareHolder",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PayLoan = model("PayLoan", payLoanSchema);

export default PayLoan;
