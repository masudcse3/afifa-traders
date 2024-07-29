/** @format */

import { z } from "zod";
export const createShareHolderSchema = z.object({
  name: z.string().min(3),
  address: z.string(),
  phone: z.string(),
  password: z.string().min(6),
  amount: z.number(),
  share: z.number(),
});
export const updateShareHolderSchema = createShareHolderSchema.partial();
