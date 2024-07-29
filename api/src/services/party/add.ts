/** @format */

import { Party } from "@/model";
import { partyDetails } from "./partyDetailsInterface";
export const addPartyService = async ({
  name,
  millName,
  address,
  phone,
  due,
}: partyDetails) => {
  const party = new Party({
    name,
    millName,
    address,
    phone,
    due,
  });
  await party.save();
  return party;
};
