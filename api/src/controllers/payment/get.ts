/** @format */

import { Request, Response, NextFunction } from "express";
import { getPaymentInfoService } from "@/services/payment";

export const getPaymentInfo = async (
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
    const paymentInfo = await getPaymentInfoService({
      party,
      from,
      to,
      page,
      limit,
    });
    if (!paymentInfo) {
      return res.status(403).json({ message: "No payment info found" });
    }
    return res.status(200).json(paymentInfo);
  } catch (error) {
    next(error);
  }
};
