/** @format */

import { Request, Response, NextFunction } from "express";
import { getloanDetailsService } from "@/services/loan";

export const getLoanDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { from, to, page, limit } = req.query as unknown as {
      from: string;
      to: string;
      page: number;
      limit: number;
    };
    const {
      Loans,
      PaidLoans,
      TotalLoan,
      TotalPaid,
      CurrentLoan,
      paginationForLoans,
      paginationForPaidLoans,
    } = await getloanDetailsService({
      id,
      from,
      to,
      page,
      limit,
    });
    res.status(200).json({
      Loans,
      PaidLoans,
      TotalLoan,
      TotalPaid,
      CurrentLoan,
      paginationForLoans,
      paginationForPaidLoans,
    });
  } catch (error) {
    next(error);
  }
};
