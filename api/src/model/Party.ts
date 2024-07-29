/** @format */

import { model, Schema } from "mongoose";
const partySchema = new Schema(
  {
    name: String,
    millName: String,
    address: String,
    phone: String,
    due: Number,
  },
  { timestamps: true }
);

const Party = model("Party", partySchema);

export default Party;
