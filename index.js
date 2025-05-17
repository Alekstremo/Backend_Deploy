import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import indexRoutes from "./Routes/index.routes.js";
import itemsRoutes from "./Routes/items.routes.js";
import items3Routes from "./Routes/item3.routes.js";
import loginRoutes from "./Routes/login.routes.js"; // Ya lo tienes
import authRoutes from "./Routes/auth.routes.js";

import { connectDB } from "./utils/mongodb.js";

const app = express();

// connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(items3Routes);
app.use(loginRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("http://localhost:5000"));