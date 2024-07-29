/** @format */

import { Request, Response, NextFunction } from "express";
import { deleteProductService } from "@/services/product";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
