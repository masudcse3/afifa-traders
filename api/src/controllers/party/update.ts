/** @format */

import { Request, Response, NextFunction } from "express";
import { updatePartyService } from "@/services/party/";
import { updatePartySchema } from "@/schemaValidation/party";

export const updateParty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parseData = updatePartySchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { name, millName, address, phone } = parseData.data;
    const party = await updatePartyService({
      id,
      name,
      millName,
      address,
      phone,
    });
    if (!party) {
      return res.status(404).json({ message: "party not found" });
    }
    res
      .status(200)
      .json({ message: "party updated successfully", data: party });
  } catch (error) {
    next(error);
  }
};
