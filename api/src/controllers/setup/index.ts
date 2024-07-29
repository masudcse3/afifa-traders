/** @format */

import { Request, Response, NextFunction } from "express";
import { setupService } from "@/services/setup";
import { createShareHolderSchema } from "@/schemaValidation/shareHolder";

export const setup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = createShareHolderSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    // setup

    const setup = await setupService(parseData.data);
    if (!setup) {
      return res
        .status(403)
        .json({ message: "Setup already completed. Please login.", code: 403 });
    }
    res.status(201).json({
      message: "Setup completed",
      data: setup,
    });
  } catch (error) {
    next(error);
  }
};
