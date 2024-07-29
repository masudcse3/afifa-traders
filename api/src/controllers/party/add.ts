/** @format */

import { Request, Response, NextFunction } from "express";
import { addPartyService } from "@/services/party/";
import { addPartySchema } from "@/schemaValidation/party";
export const addParty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = addPartySchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { name, millName, address, phone, due } = parseData.data;

    const party = await addPartyService({
      name,
      millName,
      address,
      phone,
      due,
    });
    return res.status(200).json(party);
  } catch (error) {
    next(error);
  }
};
