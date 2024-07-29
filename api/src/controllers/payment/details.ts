/** @format */

import { Request, Response, NextFunction } from "express";
import { paymentDetailService } from "@/services/payment";

export const getPaymentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { party, payments, total }: any = await paymentDetailService(id);
    if (!payments) {
      return res.status(404).json({ message: "No payments found", code: 404 });
    }
    res.status(200).json({ party, payments, total });
  } catch (error) {
    next(error);
  }
};
