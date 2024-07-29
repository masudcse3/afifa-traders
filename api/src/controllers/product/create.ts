/** @format */

import { Request, Response, NextFunction } from "express";
import { productCreateService } from "@/services/product";
import { productSchema } from "@/schemaValidation/product";

export const productCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = productSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }

    const product = (await productCreateService(parseData.data)) as {
      name: string;
      category: string;
    };
    if (!product) {
      return res.status(403).json({ message: "Product already exists" });
    }
    res.status(201).json({
      message: "Product created successfully",
      data: { name: product?.name, category: product?.category },
    });
  } catch (error) {
    next(error);
  }
};
