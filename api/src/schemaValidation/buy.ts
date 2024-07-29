/** @format */

import { z } from "zod";

export const purchasesSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  product: z.string(),
  weight: z.number(),
  rate: z.number(),
  bags: z.number().optional(),
});
export const updatePurchasesSchema = purchasesSchema.partial();
