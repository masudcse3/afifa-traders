/** @format */

import app from "./app";
import http from "http";
import { connection } from "@/db/connection";
const server = http.createServer(app);

const port = process.env.PORT || 3500;
server.listen(port, async () => {
  await connection();
  console.log(`Server starts and listening on port ${port}`);
});
