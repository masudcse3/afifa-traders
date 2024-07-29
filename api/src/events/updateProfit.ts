/** @format */

import { receiveEvent } from "@/utils/receiveEvent";
import { Profit, Stock } from "@/model";

receiveEvent("update-profit", "update-profit", async (msg) => {
  const { salesId, product, extraWeight, total, newWeight, stockWeight } =
    JSON.parse(msg);

  // get the profit
  const profitRecord = (await Profit.findOne({ salesId: salesId })) as any;
  console.log("Extra Weight", extraWeight);
  console.log("Total", total);
  console.log("newWeight", newWeight);
  console.log("stockWeight", stockWeight);
  profitRecord.sale = total;
  // get the porta
  const stock = (await Stock.findOne({ product: product })) as any;

  const porta = stock.porta;
  let extra = 0;
  let profit = 0;
  // check if the sale is gatter than stock
  console.log("Stock", stock);
  if (extraWeight > stock.weight) {
    extra = -stock.weight;
    profit = total - ((newWeight - extra) * porta) / 40;
  } else {
    profit = total - (porta * newWeight) / 40;
  }
  console.log("Extra ", extra);
  profitRecord.profit = profit - profitRecord.expense;
  profitRecord.extra = extra;
  await profitRecord.save();
});
