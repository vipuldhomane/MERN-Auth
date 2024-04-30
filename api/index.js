import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

const app = express();
//Run server on Port
app.listen(3000, () => {
  console.log("Server Listening on port 3000");
});
