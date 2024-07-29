/** @format */

import { Product } from "@/model";
import { fireEvent } from "@/utils/fireEvent";
export const deleteProductService = async (id) => {
  // check if product id exists
  const product = await Product.findById(id);
  if (!product) {
    const err: any = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  // delete product
  await Product.findByIdAndDelete(id);
  // fire an event to delete the relavant stock
  fireEvent("delete-stock", "delete-stock", JSON.stringify(product._id));

  return { message: "Product deleted successfully" };
};
