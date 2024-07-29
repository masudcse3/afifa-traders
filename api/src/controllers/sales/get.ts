/** @format */

import { Request, Response, NextFunction } from "express";
import { getSalesService } from "@/services/sales";

export const getSalesInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { party, from, to, page, limit } = req.query as unknown as {
      party: string;
      from: Date;
      to: Date;
      page: number;
      limit: number;
    };
    const salesInfo = await getSalesService({
      party,
      from,
      to,
      page,
      limit,
    });
    if (!salesInfo) {
      return res.status(403).json({ message: "No sales info found" });
    }
    return res.status(200).json(salesInfo);
  } catch (error) {
    next(error);
  }
};
