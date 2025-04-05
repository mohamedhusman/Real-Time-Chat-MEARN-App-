import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import router from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
