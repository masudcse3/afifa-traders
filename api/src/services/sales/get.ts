/** @format */

import { Sales } from "@/model";

export const getSalesService = async ({
  party,
  from,
  to,
  page = 1,
  limit = 10,
}: {
  party: string;
  from: Date;
  to: Date;
  page: number;
  limit: number;
}) => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(0, 0, 0, 0);
  const from24 = new Date("2024-01-01");
  const query = {
    createdAt: {
      $gte: from || from24,
      $lte: to || today,
    },
  };
  if (party) {
    query["party"] = party;
  }

  const [allSales, totalSales] = await Promise.all([
    Sales.find(query),
    Sales.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalSales / limit);
  const currentPage =
    totalPages !== 0 ? (page > totalPages ? totalPages : page) : 1;
  const skip = (currentPage - 1) * limit;

  const sales = await Sales.find(query)
    .skip(skip)
    .limit(limit)
    .populate({ path: "party", select: "name" });

  const summary = allSales.reduce(
    (acc: any, cur: any) => {
      acc.total += cur.total;
      acc.paid += cur.paid;
      acc.due += cur.due;
      return acc;
    },
    {
      total: 0,
      paid: 0,
      due: 0,
    }
  );

  return {
    data: sales,
    summary,
    pagination: {
      totalSales,
      totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};
