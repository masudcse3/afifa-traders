/** @format */

import { Request, Response, NextFunction } from "express";
import { updateProductService } from "@/services/product";
import { updateProductSchema } from "@/schemaValidation/product";

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parseData = updateProductSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { name, category } = parseData.data;
    const product = await updateProductService({ id, name, category });
    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    next(error);
  }
};
