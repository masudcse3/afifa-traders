/** @format */

import { Product, Profit, Sales } from "@/model";
import { fireEvent } from "@/utils/fireEvent";
interface sales {
  product: string;
  weight: number;
  rate: number;
  party: string;
  total: number;
  paid: number;
  due: number;
}
export const addSalesService = async ({
  product,
  weight,
  rate,
  party,
  total,
  paid,
  due,
}: sales) => {
  // find the last sale and disable that profit calculation
  const allSales = await Sales.find();
  if (allSales.length > 0) {
    const lastSale: any = await Sales.findOne().sort({ createdAt: -1 });
    const lastProfit: any = await Profit.findOne({ salesId: lastSale._id });
    lastProfit.calculated = true;
    await lastProfit.save();
  }

  // check the product name is valid
  const productName = await Product.findOne({ name: product });
  if (!productName) {
    const err: any = new Error(`Product ${product} not found `);
    err.status = 404;
    throw err;
  }
  // create a new sales record
  const sale = new Sales({
    product,
    weight,
    rate,
    party,
    total,
    paid,
    due,
  });
  await sale.save();

  // fire an event to calculate the profit
  const profitPayload = {
    salesId: sale._id,
    product: sale.product,
    weight: weight,
    total: total,
    rate: rate,
  };
  await fireEvent(
    "initial-profit",
    "initial-profit",
    JSON.stringify(profitPayload)
  );
  // fire an event to update the stock
  const stockPayload = {
    product: sale.product,
    weight: weight,
  };
  fireEvent(
    "update-stock-sale",
    "update-stock-sale",
    JSON.stringify(stockPayload)
  );

  return sale;
};
