/** @format */

import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string(),
  amount: z.number(),
  extra: z.boolean().default(false),
});
