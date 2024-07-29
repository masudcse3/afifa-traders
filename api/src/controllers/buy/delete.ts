/** @format */

import { Request, Response, NextFunction } from "express";
import { deletePurchasesService } from "@/services/buy";
import { fireEvent } from "@/utils/fireEvent";
export const deletePurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { id: userId } = req["user"];
    const { purchases }: any = await deletePurchasesService(id);
    if (!purchases) {
      return res.status(404).json({
        message: "Purchases not found",
      });
    }
    // fire an event to update the stock
    const payload = {
      product: purchases.product,
      weight: -purchases.weight,
      cash: -purchases.total,
    };
    await fireEvent("update-stock", "update-stock", JSON.stringify(payload));
    // fire an event to update the account
    const payloadForAccount = {
      balance: purchases.total,
      source: "Purchases",
      madeBy: userId,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(payloadForAccount)
    );
    return res.status(200).json({
      message: "Purchases deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
