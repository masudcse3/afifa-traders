/** @format */

import { ShareHolder } from "@/model";
export const updateShareHolderService = async ({
  id,
  name,
  address,
  phone,
  share,
}) => {
  try {
    const shareHolder = (await ShareHolder.findById(id)) as any;
    if (!shareHolder) {
      const err: any = new Error("Share holder not found");
      err.status = 404;
      throw err;
    }
    const updated = await ShareHolder.findByIdAndUpdate(
      id,
      {
        name: name || shareHolder.name,
        address: address || shareHolder.address,
        phone: phone || shareHolder.phone,
        share: share || shareHolder.share,
      },
      { new: true }
    ).select("-password");

    return updated;
  } catch (error) {
    console.error(error);
  }
};
