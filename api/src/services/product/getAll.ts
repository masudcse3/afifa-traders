/** @format */

import { Product } from "@/model";

export const getProductsService = async () => {
  const products = await Product.find().select("_id name category");
  return products;
};
