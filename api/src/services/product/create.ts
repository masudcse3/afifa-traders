/** @format */

import { Product } from "@/model";
import { fireEvent } from "@/utils/fireEvent";

export const productCreateService = async ({ name, category }) => {
  // check if the product already exists
  const existingProduct = await Product.findOne({
    name: name,
    category: category,
  });
  if (existingProduct) {
    return false;
  }
  // create a new product and save it to the database
  const product = new Product({ name, category });
  await product.save();
  // fire an event to create a new stock for the relavent product
  fireEvent("create-stock", "create-stock", JSON.stringify(product));
  return product;
};
