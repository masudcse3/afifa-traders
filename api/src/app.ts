/** @format */

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authMiddleware } from "@/middlewares/auth";
import router from "@/routes";
import { login } from "./controllers/auth";
import { setup } from "@/controllers/setup";
dotenv.config();

// import events
import("@/events/updateStock");
import("@/events/updateStock-sale");
import("@/events/createStock");
import("@/events/deleteStock");
import("@/events/updateDue");
import("@/events/updateAccount");
import("@/events/initialProfit");
import("@/events/updateProfit");
import("@/events/updateSales");
const app = express();

app.use(
  morgan("dev"),
  cors(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: true })
);
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Ok" });
});
// setup route
app.post("/api/v1/setup", setup);
// login route
app.post("/api/v1/login", login);
// handle routes
app.use("/api/v1", authMiddleware, router);
// 404 error handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});
// global error handler
app.use((err, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Something went wrong on the server",
  });
});
export default app;
