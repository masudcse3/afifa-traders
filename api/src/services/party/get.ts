/** @format */

import { Party } from "@/model";

export const getPartyService = async ({ s = "", page, limit }) => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const query = {
    $or: [
      { name: { $regex: s, $options: "i" } },
      { millName: { $regex: s, $options: "i" } },
    ],
  };
  const totalParties = await Party.countDocuments(query);
  const totalPages = Math.ceil(totalParties / limit);
  const currentPage =
    totalPages !== 0 ? (page > totalPages ? totalPages : page) : 1;
  const skip = (currentPage - 1) * limit;

  const parties = await Party.find(query).skip(skip).limit(limit);
  if (!parties) {
    const err: any = new Error("No party found");
    err.status = 404;
    throw err;
  }
  return {
    data: parties,
    pagination: {
      totalParties,
      totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      limit: limit,
    },
  };
};
