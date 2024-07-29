/** @format */

import { Request, Response, NextFunction } from "express";
import { addSalesService } from "@/services/sales";
import { addSalesSchema } from "@/schemaValidation/sales";
import { fireEvent } from "@/utils/fireEvent";
export const addSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate the request body
    const parseData = addSalesSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { id: userId } = req["user"];
    const { product, weight, rate, party, paid } = parseData.data;
    const total = Math.floor((weight * rate) / 40);
    const due = total - paid;
    // call the function to add the record
    const sale = await addSalesService({
      product,
      weight,
      rate,
      party,
      total,
      paid,
      due,
    });
    if (!sale) {
      return res
        .status(403)
        .json({ message: "failed to save the sales record" });
    }
    // fire an event to update the account
    const accountPayload = {
      balance: due,
      type: "Due",
      source: "Sale",
      madeBy: userId,
      addedBy: userId,
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    // fire an event to update the party's due
    const duePayload = {
      party: sale.party,
      due: due,
    };
    await fireEvent("update-due", "update-due", JSON.stringify(duePayload));
    res.status(201).json({ messsage: "Sales added successfully", data: sale });
  } catch (error) {
    next(error);
  }
};
