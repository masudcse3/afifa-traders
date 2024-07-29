/** @format */

import { allShareHoldersService } from "@/services/share-holder";
import { Request, Response, NextFunction } from "express";
export const allShareHolders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shareHolders = await allShareHoldersService();
    res.status(200).json(shareHolders);
  } catch (error) {
    next(error);
  }
};
