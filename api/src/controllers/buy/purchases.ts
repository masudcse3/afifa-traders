/** @format */

import { Request, Response, NextFunction } from "express";
import { purchasesService } from "@/services/buy";
import { purchasesSchema } from "@/schemaValidation/buy";
import { fireEvent } from "@/utils/fireEvent";
export const purchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = purchasesSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "Validation failed", error: parseData.error.errors });
    }
    const { id } = req["user"];
    const { name, address, phone, product, weight, rate, bags } =
      parseData.data;

    const total = Math.floor((weight * rate) / 40);
    const purchasesData = await purchasesService({
      name,
      address,
      phone,
      product,
      weight,
      rate,
      total,
      bags,
    });
    if (!purchasesData) {
      return res.status(403).json({ message: "Product not found" });
    }
    // fire an event to update the stock
    const payload = {
      product,
      weight,
      cash: total,
    };
    await fireEvent("update-stock", "update-stock", JSON.stringify(payload));

    // fire an event to update the account
    const accountPayload = {
      balance: -total,
      type: "Cash",
      source: "Purchases",
      madeBy: id,
      addedBy: id,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    res.status(201).json(purchasesData);
  } catch (error) {
    next(error);
  }
};
