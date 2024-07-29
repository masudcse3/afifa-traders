/** @format */

import { Party, Payment } from "@/model";

export const getPaymentInfoService = async ({
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

  const allPayments = await Payment.find(query);
  console.log(allPayments);

  const totalItems = allPayments.length;

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage =
    totalPages !== 0 ? (page > totalPages ? totalPages : page) : 1;
  const skip = (currentPage - 1) * limit;

  const payments = await Payment.find(query)
    .skip(skip)
    .limit(limit)
    .populate({ path: "party", select: "name" });

  const totalAmount = allPayments.reduce((acc: number, cur: any) => {
    acc += cur.amount;
    return acc;
  }, 0);

  return {
    data: payments,
    totalAmount: totalAmount,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};
