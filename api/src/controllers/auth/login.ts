/** @format */

import { Request, Response, NextFunction } from "express";
import { loginService } from "@/services/auth";
import { loginSchema } from "@/schemaValidation/login";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate the request body
    const parseData = loginSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { phone, password } = parseData.data;
    const token = await loginService({ phone, password });
    // const expireIn = (process.env.TOKEN_EXPIRE_IN);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "login successful", token });
  } catch (error) {
    next(error);
  }
};
