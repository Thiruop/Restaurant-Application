
import mongoose from "mongoose";
import {Restaurant, Admin, Member, Partner, Owner  } from "./schema.js";

 const connection=mongoose.connect("mongodb://127.0.0.1:27017/foods").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Connection failed:", err);
});
export default connection;