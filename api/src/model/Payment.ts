/** @format */

import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    sales: {
      type: Schema.Types.ObjectId,
      ref: "Sales",
      required: true,
    },
    party: {
      type: Schema.Types.ObjectId,
      ref: "Party",
      required: true,
    },
    payTo: {
      type: Schema.Types.ObjectId,
      ref: "ShareHolder",
      required: true,
    },
    amount: Number,
    method: {
      type: String,
      enum: ["Cash", "Check"],
      default: "Cash",
    },
    bank: {
      type: String,
      default: null,
    },
    checkNo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
export default Payment;
