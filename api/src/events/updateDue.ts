/** @format */

import { Party } from "@/model";
import { receiveEvent } from "@/utils/receiveEvent";

receiveEvent("update-due", "update-due", async (msg) => {
  const data = JSON.parse(msg);
  const { party, due } = data;
  const findParty: any = await Party.findById(party);

  if (!findParty) {
    throw new Error("Invalid party");
  }
  findParty.due += due;
  findParty.save();
});
