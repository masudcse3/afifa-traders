/** @format */

import { model, Schema } from "mongoose";

const salesSchema = new Schema(
  {
    product: String,
    weight: Number,
    rate: Number,
    party: {
      type: Schema.Types.ObjectId,
      ref: "Party",
    },
    total: Number,
    paid: Number,
    due: Number,
  },
  { timestamps: true }
);

const Sales = model("Sales", salesSchema);

export default Sales;
