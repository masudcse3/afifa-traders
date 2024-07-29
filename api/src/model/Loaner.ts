/** @format */

import { Schema, model } from "mongoose";
const loanerSchema = new Schema(
  {
    name: String,
    address: String,
    phone: String,
    amount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Loaner = model("Loaner", loanerSchema);

export default Loaner;
