/** @format */

import { Request, Response, NextFunction } from "express";
import { getPurchasesService } from "@/services/buy";

export const getPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, product, category, page, limit } = req.query as any;
    const purchasesData = await getPurchasesService({
      from,
      to,
      product,
      category,
      page,
      limit,
    });

    if (!purchasesData) {
      return res.status(403).json({ message: "No purchases found" });
    }
    // make a pagination => pages, current page, limit, next page, prev page, total items

    // total weight, cash and porta
    return res.status(200).json(purchasesData);
  } catch (error) {
    next(error);
  }
};
