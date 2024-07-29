/** @format */

// create an admin account
/** @format */

import { ShareHolder } from "@/model";
import { fireEvent } from "@/utils/fireEvent";
import bcrypt from "bcryptjs";
export const setupService = async ({
  name,
  address,
  phone,
  password,
  amount,
  share,
}) => {
  try {
    const shareHolders = await ShareHolder.find();

    if (shareHolders.length > 0) {
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
      isAdmin: true,
    });
    await holder.save();
    // fire an event to update the account
    const payload = {
      balance: amount,
      source: "Add",
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(payload)
    );
    return {
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
