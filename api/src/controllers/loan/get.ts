/** @format */

import { Request, Response, NextFunction } from "express";
import { getAllLoansService } from "@/services/loan";

export const getAllLoans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, page, limit, status } = req.query as unknown as {
      from: string;
      to: string;
      page: number;
      limit: number;
      status: string;
    };
    console.log(from, to, page, limit, status);
    const { loans, pagination, total } = await getAllLoansService({
      from,
      to,
      page,
      limit,
      status,
    });
    res.status(200).json({ loans, total, pagination });
  } catch (error) {
    next(error);
  }
};
