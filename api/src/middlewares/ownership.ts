/** @format */

import { Request, Response, NextFunction } from "express";
export const ownership = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, isAdmin } = req["user"];
    const userId = req.params.id;

    if (id === userId || isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You do not have permission to access.",
        code: 403,
      });
    }
  } catch (error) {
    next(error);
  }
};
