/** @format */

import { Request, Response, NextFunction } from "express";
import { getAccountInfoService } from "@/services/account";

export const getAccountInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const account = await getAccountInfoService();
    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
