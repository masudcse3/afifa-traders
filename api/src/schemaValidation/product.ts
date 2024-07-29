/** @format */

import { z } from "zod";
export const productSchema = z.object({
  name: z.string(),
  category: z.string(),
});

export const updateProductSchema = productSchema.partial();
