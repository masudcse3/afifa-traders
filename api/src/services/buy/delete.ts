/** @format */

import { Buy } from "@/model";

export const deletePurchasesService = async (id: string) => {
  // check the purchase exists
  const purchases = (await Buy.findById(id)) as any;
  if (!purchases) {
    return false;
  }
  // delete the purchases
  await Buy.findByIdAndDelete(id);

  return { purchases };
};
