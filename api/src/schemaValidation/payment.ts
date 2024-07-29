/** @format */

import { z } from "zod";

export const addPaymentSchema = z.object({
  sales: z.string(),
  party: z.string(),
  payTo: z.string(),
  amount: z.number(),
  method: z.enum(["Cash", "Check"]).default("Cash"),
  bank: z.string().optional(),
  checkNo: z.string().optional(),
});

export const updatePaymentSchema = addPaymentSchema.partial();
