/** @format */

import { Stock } from "@/model";
import { receiveEvent } from "@/utils/receiveEvent";

receiveEvent("delete-stock", "delete-stock", async (msg) => {
  const product_id = JSON.parse(msg);
  try {
    await Stock.deleteOne({ productId: product_id });
    console.log("Stock deleted successfully");
  } catch (error) {
    console.log(error);
  }
});
