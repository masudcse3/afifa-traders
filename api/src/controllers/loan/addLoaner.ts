/** @format */

import { Request, Response, NextFunction } from "express";
import { createLoanerService } from "@/services/loan";
import { createLoaner } from "@/schemaValidation/loan";
export const addLoaner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = createLoaner.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { name, address, phone } = parseData.data;
    const loaner = await createLoanerService({ name, address, phone });
    if (!loaner) {
      return res
        .status(404)
        .json({ message: "A loaner alreay exists with this phone number." });
    }
    res.status(201).json(loaner);
  } catch (error) {
    next(error);
  }
};
