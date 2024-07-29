/** @format */

import { Request, Response, NextFunction } from "express";
import { deletePartyService } from "@/services/party/";

export const deleteParty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const party = await deletePartyService(id);
    if (!party) {
      return res.status(404).json({ message: "party not found" });
    }
    res.status(200).json({ message: "party deleted successfully" });
  } catch (error) {
    next(error);
  }
};
