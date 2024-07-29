/** @format */

import { model, Schema } from "mongoose";

const profitSchema = new Schema(
  {
    salesId: {
      type: Schema.Types.ObjectId,
      ref: "Sales",
    },
    sale: {
      type: Number,
    },
    expense: {
      type: Number,
      default: 0,
    },
    extra: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    lose: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: [Schema.Types.ObjectId],
      ref: "Expense",
    },
    calculated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Profit = model("Profit", profitSchema);

export default Profit;
