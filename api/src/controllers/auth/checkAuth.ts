/** @format */

import { Request, Response, NextFunction } from "express";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    console.log("Token", token);
    res.status(200).json({ message: "authorized" });
  } catch (error) {
    next(error);
  }
};
