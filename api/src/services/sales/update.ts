/** @format */
import { Sales } from "@/model";

export const updateSalesService = async ({ id, weight, rate, paid }) => {
  // check if the Sales exists
  const sale: any = await Sales.findById(id);
  if (!sale) {
    const err: any = new Error("Sales not found");
    err.status = 404;
    throw err;
  }
  // update the record
  const newrate = rate || sale.rate;
  const newweight = weight || sale.weight;
  const newpaid = paid || sale.paid;
  const total = (newrate * newweight) / 40;
  const newdue = total - newpaid;

  const updatedSale = await Sales.findByIdAndUpdate(
    id,
    {
      weight: newweight,
      rate: newrate,
      total: total,
      paid: newpaid,
      due: newdue,
    },
    { new: true }
  );

  return { sale, updatedSale, newdue, newpaid, newweight };
};
