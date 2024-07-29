/** @format */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ShareHolder } from "@/model";
export const loginService = async ({ phone, password }) => {
  // check if user is exists
  const user: any = await ShareHolder.findOne({ phone: phone });
  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }
  // check the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err: any = new Error("Invalid password");
    err.status = 401;
    throw err;
  }
  // generate a token and save for cookies
  const payload = {
    id: user._id,
    name: user.name,
    phone: user.phone,
    address: user.address,
    amount: user.amount,
    share: user.share,
    isAdmin: user.isAdmin,
  };
  const TOKEN_SECRET = process.env.TOKEN_SECRET || "yu768vbcf45()";

  const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "30d" });
  return token;
};
