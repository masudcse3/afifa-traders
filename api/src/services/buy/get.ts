/** @format */

import { Buy } from "@/model";
export const getPurchasesService = async ({
  from,
  to,
  product = "",
  category = "",
  page,
  limit,
}) => {
  // get todays purchases by default, but can filter with from, to, category and product name

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const query: any = {
    createdAt: {
      $gte: from || today,
      $lt: to || nextDay,
    },
  };
  if (product) {
    query.product = product;
  }
  if (category) {
    query.category = category;
  }
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const allPurchases = await Buy.find(query);
  const totalItems = allPurchases.length;

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage =
    totalPages !== 0 ? (page > totalPages ? totalPages : page) : 1;
  const skip = (currentPage - 1) * limit;

  const purchases = await Buy.find(query).skip(skip).limit(limit);
  const summary = allPurchases.reduce(
    (acc: any, cur: any) => {
      acc.total += cur.total;
      acc.weight += cur.weight;
      const portaStr = (acc.total * 40) / acc.weight;
      acc.porta = parseFloat(portaStr.toFixed(2));
      return acc;
    },
    { total: 0, weight: 0, porta: 0 }
  );
  return {
    items: purchases,
    summary,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};
