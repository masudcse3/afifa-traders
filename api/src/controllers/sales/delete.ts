/** @format */

import { Request, Response, NextFunction } from "express";
import { deleteSalesService } from "@/services/sales";
import { addSalesSchema } from "@/schemaValidation/sales";

export const deleteSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const sale = await deleteSalesService(id);
    if (!sale) {
      return res
        .status(403)
        .json({ message: "failed to delete the sales record" });
    }
    res
      .status(201)
      .json({ messsage: "Sales deleted successfully", data: sale });
  } catch (error) {
    next(error);
  }
};
