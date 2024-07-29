/** @format */

import { z } from "zod";
export const createLoaner = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
});

export const createLoan = z.object({
  loaner: z.string(),
  receiver: z.string(),
  amount: z.number(),
});
export const payLoanSchema = z.object({
  amount: z.number(),
  paidBy: z.string(),
});
