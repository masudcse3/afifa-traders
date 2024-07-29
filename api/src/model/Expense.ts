/** @format */

import { model, Schema } from "mongoose";
const expenseSchema = new Schema(
  {
    title: String,
    amount: Number,
    salesId: {
      type: Schema.Types.ObjectId,
      ref: "Sales",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "ShareHolder",
      default: null,
    },
    madeBy: String,
    isUsed: {
      type: Boolean,
      default: false,
    },
    extra: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Expense = model("Expense", expenseSchema);
export default Expense;
