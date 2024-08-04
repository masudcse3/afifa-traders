/** @format */
import mongoose from "mongoose";
let dbUrl =
  process.env.NODE_ENV !== "dev"
    ? process.env.DB_CLOUD_URL
    : process.env.DB_URL;
const username: string = process.env.DB_USERNAME || "";
const password: string = process.env.DB_PASSWORD || "";
dbUrl = dbUrl?.replace("<username>", username);
dbUrl = dbUrl?.replace("<password>", password);
console.log("Database URL: " + dbUrl);

export const connection = async () => {
  try {
    await mongoose.connect(dbUrl || "", {
      dbName: "Afifa",
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error", error);
  }
};
