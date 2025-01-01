import mongoose from "mongoose";
import initDb from "./initDb.config";

export default () =>
  mongoose
    .connect(process.env.MONGODB_URI || "", {
      dbName: process.env.DB_NAME || "",
    })
    .then(() => {
      initDb();
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
