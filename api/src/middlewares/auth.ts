/** @format */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
        code: 401,
      });
    }
    const tokenSecret = process.env.TOKEN_SECRET || "yu768vbcf45()";
    const decodeToken = jwt.verify(token, tokenSecret);
    req["user"] = decodeToken;
    next();
  } catch (error) {
    next(error);
  }
};
