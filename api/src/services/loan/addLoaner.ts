/** @format */

import { Loaner } from "@/model";

export const createLoanerService = async ({
  name,
  address,
  phone,
}: {
  name: string;
  address: string;
  phone: string;
}) => {
  try {
    const loanerExists = await Loaner.findOne({ phone });
    if (loanerExists) {
      return false;
    }
    // create a new loaner
    const loaner = new Loaner({ name, address, phone });
    await loaner.save();
    return loaner;
  } catch (error) {
    console.error("Create Loaner Error:", error);
  }
};
