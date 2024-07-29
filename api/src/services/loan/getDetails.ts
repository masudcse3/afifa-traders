/** @format */

import { Loan, PayLoan } from "@/model";

export const getloanDetailsService = async ({
  id,
  from,
  to,
  page,
  limit,
}: {
  id: string;
  from: string;
  to: string;
  page: number;
  limit: number;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const start: any = new Date(`${month}/01/${year}`);
  const end: any = new Date(today);
  end.setDate(today.getDate() + 1);

  const query: any = {
    $and: {
      updatedAt: {
        $gte: from || start,
        $lt: to || end,
      },
      loaner: id,
    },
  };

  page = Number(page) || 1;
  limit = Number(limit) || 20;
  // All loans
  const allLoans = await Loan.find(query);
  const totalLoan = allLoans.reduce((acc, cur) => (acc += cur.amount), 0);
  const totalLoanItems = allLoans.length;

  const totalPages = Math.ceil(totalLoanItems / limit);
  const currentPage =
    totalPages !== 0 ? (page > totalPages ? totalPages : page) : 1;
  const skip = (currentPage - 1) * limit;
  const loans = await Loan.find(query)
    .populate({ path: "loaner", select: "name address phone" })
    .populate({ path: "receiver", select: "name" })
    .skip(skip)
    .limit(limit);

  // paid loans
  const paidLoans = await PayLoan.find(query);
  const totalPaid = paidLoans.reduce((acc, cur) => (acc += cur.amount), 0);
  const totalPaidLoanItems = paidLoans.length;
  const totalPaidPages = Math.ceil(totalPaidLoanItems / limit);
  const currentPaidPage =
    totalPaidPages !== 0 ? (page > totalPaidPages ? totalPaidPages : page) : 1;
  const skipPaid = (currentPaidPage - 1) * limit;
  const allPaidLoans = await PayLoan.find(query).skip(skipPaid).limit(limit);
  return {
    Loans: loans,
    PaidLoans: allPaidLoans,
    TotalLoan: totalLoan,
    TotalPaid: totalPaid,
    CurrentLoan: totalLoan - totalPaid,
    paginationForLoans: {
      totalItems: totalLoanItems,
      totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
    paginationForPaidLoans: {
      totalItems: totalPaidLoanItems,
      totalPages: totalPaidPages,
      currentPage: currentPaidPage,
      nextPage: currentPaidPage < totalPaidPages ? currentPaidPage + 1 : null,
      prevPage: currentPaidPage > 1 ? currentPaidPage - 1 : null,
    },
  };
};
