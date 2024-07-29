/** @format */

import { Stock } from "@/model";
export const resetStockService = async (id: string) => {
  // check id the stock exists
  const stock = await Stock.findById(id);
  if (!stock) {
    throw new Error("Stock not found");
  }
  stock.weight = 0;
  stock.cash = 0;
  stock.porta = 0;
  await stock.save();
  return stock;
};
