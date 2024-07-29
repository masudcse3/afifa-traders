/** @format */

import { Stock } from "@/model";
import { receiveEvent } from "@/utils/receiveEvent";
receiveEvent("update-stock-sale", "update-stock-sale", async (msg) => {
  const data = JSON.parse(msg);
  const { product, weight } = data;
  const stock: any = await Stock.findOne({ product });
  if (!stock) {
    return { message: "Stock not found" };
  }
  stock.weight -= weight;
  stock.cash -= Math.floor((stock.porta * weight) / 40);
  await stock.save();
});
