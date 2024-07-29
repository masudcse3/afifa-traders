/** @format */

import { z } from "zod";

export const addPartySchema = z.object({
  name: z.string(),
  millName: z.string(),
  address: z.string(),
  phone: z.string(),
  due: z.number().default(0),
});

export const updatePartySchema = addPartySchema.partial();
