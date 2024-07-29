/** @format */

import { ShareHolder } from "@/model";
export const allShareHoldersService = async () => {
  return await ShareHolder.find().select("name address phone amount share");
};
