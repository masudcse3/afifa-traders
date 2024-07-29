/** @format */

import { Sales } from "@/model";
import { receiveEvent } from "@/utils/receiveEvent";

receiveEvent("update-sales", "update-sales", async (msg) => {
  const { sales, amount } = JSON.parse(msg);
  // find the sale
  const sale: any = await Sales.findById(sales);
  sale.paid += amount;
  sale.due -= amount;

  await sale.save();
});
