/** @format */

import { model, Schema } from "mongoose";
const accountHistoriesSchema = new Schema(
  {
    balance: Number,
    source: {
      type: String,
      enum: ["Add", "Loan", "Purchases", "Sale", "Expense", "Payment"],
      default: "Purchases",
    },
    type: {
      type: String,
      enum: ["Cash", "Check", "Due"],
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
    // the actual responsible person
    madeBy: {
      type: Schema.Types.ObjectId,
      ref: "ShareHolder",
    },
    // the auth user
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "ShareHolder",
    },
  },
  { timestamps: true }
);

const AccountHistories = model("AccountHistories", accountHistoriesSchema);

export default AccountHistories;
