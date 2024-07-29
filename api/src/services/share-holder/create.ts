/** @format */

import { ShareHolder } from "@/model";

import bcrypt from "bcryptjs";
export const createShareHolderService = async ({
  name,
  address,
  phone,
  password,
  amount,
  share,
}) => {
  try {
    const shareHolder = await ShareHolder.find({ phone });
    const shareHolders = await ShareHolder.find();

    if (shareHolder.length > 0) {
      return false;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const holder = new ShareHolder({
      name,
      address,
      phone,
      password: hashPassword,
      amount,
      share,
      isAdmin: shareHolders.length === 0 ? true : false,
    });
    await holder.save();

    return {
      id: holder._id,
      name: holder.name,
      address: holder.address,
      phone: holder.phone,
      amount: holder.amount,
      share: holder.share,
    };
  } catch (error) {
    console.error(error);
  }
};
