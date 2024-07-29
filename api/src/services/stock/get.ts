/** @format */

import { Stock } from "@/model";

export const getStockService = async ({ category, product }) => {
  const query = {};
  if (category) {
    query["category"] = category;
  }
  if (product) {
    query["product"] = product;
  }
  const stocks = await Stock.find(query);
  if (stocks.length === 0) {
    const err: any = new Error("No stocks found");
    err.status = 404;
    throw err;
  }
  return stocks;
};
