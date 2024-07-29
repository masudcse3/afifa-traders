/** @format */

import { Request, Response, NextFunction } from "express";
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isAdmin } = req["user"];
    console.log("Is Admin", isAdmin);
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "You don't have permision to access.", code: 403 });
    }
    next();
  } catch (error) {
    next(error);
  }
};
