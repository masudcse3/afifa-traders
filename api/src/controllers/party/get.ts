/** @format */

import { Request, Response, NextFunction } from "express";
import { getPartyService } from "@/services/party/";

export const getParties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { s, page, limit } = req.query as any;

    const parties = await getPartyService({ s, page, limit });
    if (!parties) {
      return res.status(404).json({ message: "No party found" });
    }
    res.status(200).json(parties);
  } catch (error) {
    next(error);
  }
};
