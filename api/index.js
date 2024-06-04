import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

//Initialize express server
const app = express();

// read the json data passed in the body
app.use(express.json());

// initialize cookie parser
app.use(cookieParser());

// setup to run on render

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "/client/dist");

app.use(express.static(staticPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

//Run server on Port
app.listen(3000, () => {
  console.log("Server Listening on port 3000");
});

app.get("/", (req, res) => {
  res.json("API is Working!!");
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
