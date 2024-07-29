/** @format */

import { receiveEvent } from "@/utils/receiveEvent";
import { Stock } from "@/model";
receiveEvent("create-stock", "create-stock", async (data) => {
  const { _id, name, category } = JSON.parse(data);
  const stock = new Stock({
    product: name,
    category: category,
    weight: 0,
    cash: 0,
    productId: _id,
  });
  await stock.save();
});
