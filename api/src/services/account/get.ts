/** @format */

import { Account } from "@/model";

export const getAccountInfoService = async () => {
  const findAccount = await Account.find();
  const account: any = findAccount[0];
  const total = account.cash + account.check + account.due;
  return {
    Cash: account.cash,
    Check: account.check,
    Due: account.due,
    Total: total,
  };
};
