/** @format */

import { Request, Response, NextFunction } from "express";
import { updatePurchasesService } from "@/services/buy";
import { updatePurchasesSchema } from "@/schemaValidation/buy";
import { fireEvent } from "@/utils/fireEvent";
export const updatePurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parseData = updatePurchasesSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "Validation failed", error: parseData.error.errors });
    }
    const { id: userId } = req["user"];
    const { name, address, phone, product, weight, rate, bags } =
      parseData.data;

    const { purchases, updatedPurchases }: any = await updatePurchasesService({
      id,
      name,
      address,
      phone,
      product,
      weight,
      rate,
      bags,
    });
    if (!updatedPurchases) {
      return res.status(403).json({ message: "purchases not found" });
    }
    // fire end event to balance the stock
    const payload = {
      product: purchases.product,
      weight: updatedPurchases.weight - purchases.weight,
      cash: updatedPurchases.total - purchases.total,
    };

    await fireEvent("update-stock", "update-stock", JSON.stringify(payload));
    // fire an event to update the accounts
    const payloadForAccount = {
      balance: purchases.total - updatedPurchases.total,
      source: "Purchases",
      type: "Cash",
      madeBy: userId,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(payloadForAccount)
    );
    return res.status(200).json(updatedPurchases);
  } catch (error) {
    next(error);
  }
};
