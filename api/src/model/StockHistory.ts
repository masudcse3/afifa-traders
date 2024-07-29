/** @format */

import { model, Schema } from "mongoose";
const stockHistoriesShema = new Schema(
  {
    product: String,
    weight: Number,
    type: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
  },
  { timestamps: true }
);

const StockHistories = model("StockHistories", stockHistoriesShema);

export default StockHistories;
