/** @format */

import { model, Schema } from "mongoose";
const stockSchema = new Schema({
  product: String,
  weight: Number,
  cash: Number,
  category: String,
  porta: Number,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Stock = model("Stock", stockSchema);
export default Stock;
