/** @format */

import { Product } from "@/model";

export const updateProductService = async ({ id, name, category }) => {
  // check if the product id exists
  const product = await Product.findById(id);
  if (!product) {
    const err: any = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name: name || product.name, category: category || product.category },
    { new: true }
  ).select("_id name category");
  return updatedProduct;
};
