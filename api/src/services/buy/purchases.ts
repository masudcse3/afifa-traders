/** @format */

import { Buy, Product } from "@/model";

export const purchasesService = async ({
  name,
  address,
  phone,
  product,
  weight,
  rate,
  total,
  bags,
}) => {
  const productCheck = await Product.findOne({ name: product }).select(
    "category -_id"
  );
  if (!productCheck) {
    return false;
  }

  const purchases = new Buy({
    name,
    address,
    phone,
    product,
    category: productCheck.category,
    weight,
    rate,
    total,
    bags,
  });
  await purchases.save();

  return purchases;
};
