/** @format */

import { Loaner } from "@/model";

export const getAllLoansService = async ({
  from,
  to,
  page,
  limit,
  status,
}: {
  from: string;
  to: string;
  page: number;
  limit: number;
  status: string;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const start: any = new Date(`${month}/01/${year}`);
  const end: any = new Date(today);
  end.setDate(today.getDate() + 1);

  let query = {};

  if (status === "all") {
    query = {
      $and: {
        updatedAt: {
          $gte: from || start,
          $lt: to || end,
        },
      },
    };
  } else if (status === "paid") {
    query = {
      $and: {
        updatedAt: {
          $gte: from || start,
          $lt: to || end,
        },
        amount: {
          $lt: 1,
        },
      },
    };
  } else {
    query = {
      $and: {
        updatedAt: {
          $gte: from || start,
          $lt: to || end,
        },
        amount: {
          $gte: 1,
        },
      },
    };
  }

  page = Number(page) || 1;
  limit = Number(limit) || 20;
  // show all unpaid loan, user can filter all loan between dates and status
  const allLoans = await Loaner.find(query);
  const totalLoan = allLoans.reduce((acc, cur) => (acc += cur.amount), 0);
  const totalItems = allLoans.length;

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage =
    totalPages !== 0 ? (page > totalPages ? totalPages : page) : 1;
  const skip = (currentPage - 1) * limit;
  const loans = await Loaner.find(query).skip(skip).limit(limit);

  return {
    loans,
    total: totalLoan,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};
