/** @format */

import { Stock } from "@/model";
import { receiveEvent } from "@/utils/receiveEvent";

receiveEvent("update-stock", "update-stock", async (msg) => {
  const data = JSON.parse(msg);
  const { product, weight, cash } = data;
  const stock: any = await Stock.findOne({ product });
  if (!stock) {
    return { message: "Stock not found" };
  }
  stock.weight += weight;
  stock.cash += cash;
  const portaStr = (stock.cash * 40) / stock.weight;
  console.log("Porta string", portaStr);
  stock.porta = parseFloat(portaStr.toFixed(2));
  await stock.save();
});
