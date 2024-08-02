/** @format */

import { Stock } from "@/model";
import { receiveEvent } from "@/utils/receiveEvent";

receiveEvent("delete-stock", "delete-stock", async (msg) => {
  const product_id = JSON.parse(msg);
  try {
    await Stock.deleteOne({ productId: product_id });
  } catch (error) {
    console.error(error);
  }
});
