/** @format */

import { receiveEvent } from "@/utils/receiveEvent";
import { Stock } from "@/model";
receiveEvent("stock-in", "stock-in", async (data) => {
  try {
    const purchases = JSON.parse(data);
    // update the relavant stock
    let stock = await Stock.findOne({ product: purchases.product });
    if (!stock) {
      return { message: "Stock not found" };
    }
    stock.weight += purchases.weight;
    stock.cash += purchases.total;
    await stock.save();
  } catch (error) {
    console.error(error);
  }
});
