/** @format */

import { model, Schema } from "mongoose";
import { boolean } from "zod";
const shareHolderSchema = new Schema(
  {
    name: String,
    address: String,
    phone: {
      type: String,
      unique: true,
    },
    password: String,
    amount: Number,
    share: Number,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, _id: true }
);

const ShareHolder = model("ShareHolder", shareHolderSchema);
export default ShareHolder;
