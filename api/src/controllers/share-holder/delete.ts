/** @format */

import { deleteShareHolderService } from "@/services/share-holder";
import { Request, Response, NextFunction } from "express";

export const deleteShareHolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteShareHolderService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
