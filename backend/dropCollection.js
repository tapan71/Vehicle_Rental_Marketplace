// dropCollections.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const dropAll = async () => {
  await connectDB();
  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const col of collections) {
    await mongoose.connection.db.dropCollection(col.name);
    console.log(`Dropped: ${col.name}`);
  }
  process.exit(0);
};

dropAll();