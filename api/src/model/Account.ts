/** @format */

import { model, Schema } from "mongoose";
const accountSchema = new Schema(
  {
    cash: Number,
    check: Number,
    due: Number,
  },
  { timestamps: true }
);

const Account = model("Account", accountSchema);

export default Account;
