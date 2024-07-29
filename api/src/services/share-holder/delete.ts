/** @format */

import { ShareHolder } from "@/model";
import { fireEvent } from "@/utils/fireEvent";
export const deleteShareHolderService = async (id: string) => {
  try {
    const shareHolder = (await ShareHolder.findById(id)) as any;

    if (!shareHolder) {
      return {
        message: "share holder not found",
      };
    }
    await ShareHolder.findByIdAndDelete(id);
    // fire an event to update the account
    const payload = {
      balance: -shareHolder.amount,
      type: "Cash",
      source: "Loan",
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(payload)
    );
    return {
      message: "share holder deleted successfully",
    };
  } catch (error) {
    console.error(error);
  }
};
