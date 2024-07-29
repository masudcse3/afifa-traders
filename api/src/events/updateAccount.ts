/** @format */

import { Account, AccountHistories } from "@/model";

import { receiveEvent } from "@/utils/receiveEvent";

receiveEvent("update-account", "update-account", async (msg) => {
  try {
    const { balance, source, type, bank, checkNo, madeBy, addedBy } =
      JSON.parse(msg);
    const accountExists: any = await Account.find();

    // initial account setup
    if (accountExists.length === 0) {
      const newAccount = new Account({ cash: balance, check: 0, due: 0 });
      const accountHistory = new AccountHistories({
        balance,
        type,
        source,
        madeBy,
        addedBy,
      });
      await newAccount.save();
      await accountHistory.save();
    }

    // update the account and create a history according to the rules
    const account = accountExists[0];
    // Add, Sale, Payment, balance will +
    // Due will add to due
    // Check the type check and add balance
    if (type === "Check") {
      account.check += balance;
    } else if (type === "Due") {
      account.due += balance;
    } else {
      account.cash += balance;
    }
    const accountHistory = new AccountHistories({
      balance,
      source: source || "Purchase",
      type: type || "Cash",
      bank: bank || null,
      checkNo: checkNo || null,
      madeBy,
      addedBy,
    });
    await account.save();
    await accountHistory.save();
  } catch (error) {
    console.error(error);
  }
});
