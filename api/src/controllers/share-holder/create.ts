/** @format */

import { Request, Response, NextFunction } from "express";
import { createShareHolderService } from "@/services/share-holder";
import { createShareHolderSchema } from "@/schemaValidation/shareHolder";
import { fireEvent } from "@/utils/fireEvent";
export const createShareHolder = async (
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
    const { id } = req["user"];
    const { amount } = parseData.data;
    const result = await createShareHolderService(parseData.data);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Share holder already exists", code: 404 });
    }
    // fire an event to update the account
    const payload = {
      balance: amount,
      source: "Add",
      madeBy: result.id,
      addedBy: id,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(payload)
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
