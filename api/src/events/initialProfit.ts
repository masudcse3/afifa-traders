/** @format */

import { receiveEvent } from "@/utils/receiveEvent";
import { Profit, Stock } from "@/model";

receiveEvent("initial-profit", "initial-profit", async (msg) => {
  const { salesId, product, weight, total } = JSON.parse(msg);
  // get the porta
  const stock = (await Stock.findOne({ product: product })) as any;

  const porta = stock.porta;
  let extra = 0;
  let profit = 0;
  // check if the sale is gatter than stock

  if (weight > stock.weight) {
    extra = weight - stock.weight;
    profit = total - stock.cash;
  } else {
    const totalPrice = (porta * weight) / 40;
    profit = total - totalPrice;
  }

  const profitRecord = new Profit({ salesId, profit, extra, sale: total });
  await profitRecord.save();
});
