require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");
const Review = require("./models/Review");
const Notification = require("./models/Notification");

const clearData = async () => {
  await connectDB();
  await User.deleteMany({});
  await Vehicle.deleteMany({});
  await Booking.deleteMany({});
  await Payment.deleteMany({});
  await Review.deleteMany({});
  await Notification.deleteMany({});
  console.log("All collections cleared");
  process.exit(0);
};

clearData();