/** @format */

import { model, Schema } from "mongoose";
const productSchema = new Schema(
  {
    name: String,
    category: String,
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;
