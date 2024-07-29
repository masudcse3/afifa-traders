/** @format */

import { Request, Response, NextFunction } from "express";
import { updateShareHolderService } from "@/services/share-holder";
import { updateShareHolderSchema } from "@/schemaValidation/shareHolder";

export const updateShareHolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parseData = updateShareHolderSchema.safeParse(req.body);
    if (!parseData.success) {
      return res.status(403).json({
        message: "validation failed",
        error: parseData.error.errors,
      });
    }
    const { name, address, phone, share } = parseData.data;
    const shareHolder = await updateShareHolderService({
      id,
      name,
      address,
      phone,
      share,
    });
    res.status(200).json(shareHolder);
  } catch (error) {
    next(error);
  }
};
