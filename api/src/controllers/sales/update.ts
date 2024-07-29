/** @format */

import { Request, Response, NextFunction } from "express";
import { updateSalesService } from "@/services/sales";
import { updateSalesSchema } from "@/schemaValidation/sales";
import { fireEvent } from "@/utils/fireEvent";
export const updateSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // validate the request body
    const parseData = updateSalesSchema.safeParse(req.body);
    if (!parseData.success) {
      return res
        .status(403)
        .json({ message: "validation failed", error: parseData.error.errors });
    }
    const { weight, rate, party, paid } = parseData.data;

    // call the function to add the record
    const { sale, updatedSale, newdue, newpaid, newweight } =
      await updateSalesService({
        id,
        weight,
        rate,
        paid,
      });
    if (!updatedSale) {
      return res
        .status(403)
        .json({ message: "failed to upate the sales record" });
    }
    // fire an event to update the stock
    const stockPayload = {
      product: sale.product,
      weight: newweight - sale.weight,
    };
    fireEvent(
      "update-stock-sale",
      "update-stock-sale",
      JSON.stringify(stockPayload)
    );

    // update the relavant profit
    const profitPayload = {
      salesId: sale.id,
      product: sale.product,
      total: updatedSale.total,
      extraWeight: newweight - sale.weight,
      stockWeight: sale.weight,
      newWeight: newweight,
    };
    fireEvent("update-profit", "update-profit", JSON.stringify(profitPayload));

    // fire an event to update the account
    const accountPayload = {
      balance: newdue - sale.due,
      type: "Due",
      source: "Sale",
    };
    await fireEvent(
      "update-account",
      "update-account",
      JSON.stringify(accountPayload)
    );
    // fire an event to update the party's due
    const duePayload = {
      party: sale.party,
      due: newdue - sale.due,
    };
    fireEvent("update-due", "update-due", JSON.stringify(duePayload));
    res
      .status(200)
      .json({ messsage: "Sales updated successfully", data: updatedSale });
  } catch (error) {
    next(error);
  }
};
