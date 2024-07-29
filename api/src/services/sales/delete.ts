/** @format */
import { Sales } from "@/model";
import { fireEvent } from "@/utils/fireEvent";

export const deleteSalesService = async (id: string) => {
  // check if the Sales exists
  const sale: any = await Sales.findById(id);
  if (!sale) {
    const err: any = new Error("Sales not found");
    err.status = 404;
    throw err;
  }
  // delete the record
  await Sales.findByIdAndDelete(id);

  // fire an event to update the stock
  const stockPayload = {
    product: sale.product,
    weight: sale.weight,
  };
  fireEvent(
    "update-stock-sale",
    "update-stock-sale",
    JSON.stringify(stockPayload)
  );
  // fire an event to update the account
  const accountPayload = {
    balance: -sale.total,
    due: -sale.due,
    source: "Delete Sales",
  };
  await fireEvent(
    "update-account",
    "update-account",
    JSON.stringify(accountPayload)
  );
  // fire an event to update the party's due
  const duePayload = {
    party: sale.party,
    due: -sale.due,
  };
  fireEvent("update-due", "update-due", JSON.stringify(duePayload));
  return sale;
};
