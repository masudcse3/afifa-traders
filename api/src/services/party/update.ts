/** @format */

import { Party } from "@/model";

export const updatePartyService = async ({
  id,
  name,
  millName,
  address,
  phone,
}: any) => {
  // check if the party exists
  const party = await Party.findById(id);
  if (!party) {
    const err: any = new Error("No party found");
    err.status = 404;
    throw err;
  }
  // update the party
  const updatedParty = await Party.findByIdAndUpdate(
    id,
    {
      name: name || party.name,
      millName: millName || party.millName,
      address: address || party.address,
      phone: phone || party.phone,
    },
    { new: true }
  );
  return updatedParty;
};
