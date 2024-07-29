/** @format */

import { Buy } from "@/model";

export const updatePurchasesService = async ({
  id,
  name,
  address,
  phone,
  product,
  weight,
  rate,
  bags,
}) => {
  // check if the purchases exists
  const purchases = (await Buy.findById(id)) as any;
  if (!purchases) {
    return false;
  }
  // update the purchases
  const total = ((weight || purchases.weight) * (rate || purchases.rate)) / 40;
  const updatedPurchases = (await Buy.findByIdAndUpdate(
    id,
    {
      name: name || purchases.name,
      address: address || purchases.address,
      phone: phone || purchases.phone,
      product: product || purchases.product,
      weight: weight || purchases.weight,
      rate: rate || purchases.rate,
      bags: bags || purchases.bags,
      total,
    },
    {
      new: true,
    }
  )) as any;

  return { purchases, updatedPurchases };
};
