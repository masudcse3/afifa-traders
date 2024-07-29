/** @format */

import { z } from "zod";

export const addSalesSchema = z.object({
  product: z.string(),
  weight: z.number(),
  rate: z.number(),
  party: z.string(),
  paid: z.number().default(0),
});
export const updateSalesSchema = addSalesSchema
  .partial()
  .extend({ total: z.number().optional(), due: z.number().optional() });
