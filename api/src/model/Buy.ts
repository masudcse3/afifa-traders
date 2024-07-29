/** @format */

import { model, Schema } from "mongoose";
const purchasesSchema = new Schema(
  {
    name: String,
    address: String,
    phone: String,
    product: String,
    category: String,
    weight: Number,
    rate: Number,
    total: Number,
    bags: Number,
  },
  { timestamps: true }
);

const Buy = model("Buy", purchasesSchema);
export default Buy;
