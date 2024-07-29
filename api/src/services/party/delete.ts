/** @format */

import { Party } from "@/model";

export const deletePartyService = async (id: string) => {
  // check if the party exists
  const party = await Party.findById(id);
  if (!party) {
    const err: any = new Error("No party found");
    err.status = 404;
    throw err;
  }
  // delete the party
  await Party.findByIdAndDelete(id);

  return true;
};
