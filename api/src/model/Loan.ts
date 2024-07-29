/** @format */

import { Schema, model } from "mongoose";
const loanSchema = new Schema(
  {
    loaner: {
      type: Schema.Types.ObjectId,
      ref: "Loaner",
      required: true,
    },
    receiver: {
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

const Loan = model("Loan", loanSchema);

export default Loan;
