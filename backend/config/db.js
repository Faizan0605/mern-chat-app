const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();  // ✅ make sure .env variables are loaded

const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI
      , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log("✅ Connected to MongoDB successfully", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop the server if connection fails
  }
};

module.exports = connectDB;
