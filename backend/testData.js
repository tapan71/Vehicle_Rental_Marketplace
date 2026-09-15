require("dotenv").config();
const connectDB = require("./config/db");

const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");
const Review = require("./models/Review");
const Notification = require("./models/Notification");

const createTestData = async () => {
  await connectDB();

  try {
    // ---------- 1. CONSUMER ----------
    let consumer = await User.findOne({ email: "consumer@test.com" });
    if (!consumer) {
      consumer = await User.create({
        name: "Test Consumer",
        email: "consumer@test.com",
        phone: "9999999991",
        password: "test123",
        city: "Vadodara",
        role: "consumer",
        license: {
          licenseNumber: "GJ0120230001",
          imageUrl: "https://example.com/license1.jpg",
          status: "uploaded"
        }
      });
      console.log("Consumer created:", consumer.email);
    } else {
      console.log("Consumer already exists:", consumer.email);
    }

    // ---------- 2. OWNER ----------
    let owner = await User.findOne({ email: "owner@test.com" });
    if (!owner) {
      owner = await User.create({
        name: "Test Owner",
        email: "owner@test.com",
        phone: "9999999992",
        password: "test123",
        city: "Vadodara",
        role: "owner"
      });
      console.log("Owner created:", owner.email);
    } else {
      console.log("Owner already exists:", owner.email);
    }

    // ---------- 3. ADMIN ----------
    let admin = await User.findOne({ email: "admin@test.com" });
    if (!admin) {
      admin = await User.create({
        name: "Test Admin",
        email: "admin@test.com",
        phone: "9999999993",
        password: "admin123",
        city: "Vadodara",
        role: "admin"
      });
      console.log("Admin created:", admin.email);
    } else {
      console.log("Admin already exists:", admin.email);
    }

    // ---------- 4. VEHICLE ----------
    let vehicle = await Vehicle.findOne({ registrationNumber: "GJ15AC4554" });
    if (!vehicle) {
      vehicle = await Vehicle.create({
        ownerId: owner._id,
        type: "bike",
        brand: "Honda",
        model: "Activa 6G",
        registrationNumber: "GJ15AC4554",
        images: ["https://example.com/activa1.jpg"],
        price:500,
        year:2023,
        helmetProvided: true,
        status: "available"
      });
      console.log("Vehicle created:", vehicle.brand, vehicle.model);
    } else {
      console.log("Vehicle already exists:", vehicle.registrationNumber);
    }

    // ---------- 5. BOOKING ----------
    let booking = await Booking.findOne({
      vehicleId: vehicle._id,
      consumerId: consumer._id
    });

    if (!booking) {
      booking = await Booking.create({
        vehicleId: vehicle._id,
        userId: consumer._id,
        ownerId: owner._id,
        bookingType: "instant",
        startDateTime: new Date(),
        endDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: "returned",
        totalAmount: 100,
        paymentStatus: "mock_paid"
      });
      console.log("Booking created:", booking._id.toString());

      vehicle.status = "available";
      await vehicle.save();
    } else {
      console.log("Booking already exists:", booking._id.toString());
    }

    // ---------- 6. PAYMENT ----------
    let payment = await Payment.findOne({ bookingId: booking._id });
    if (!payment) {
      payment = await Payment.create({
        bookingId: booking._id,
        amount: booking.totalAmount,
        paymentStatus: "mock_paid",
        paymentDate: new Date()
      });
      console.log("Payment created:", payment._id.toString());
    } else {
      console.log("Payment already exists:", payment._id.toString());
    }

    // ---------- 7. REVIEW ----------
    let review = await Review.findOne({ bookingId: booking._id });
    if (!review) {
      review = await Review.create({
        bookingId: booking._id,
        vehicleId: vehicle._id,
        rating: 5,
        comment: "Smooth ride, vehicle was in great condition!"
      });
      console.log("Review created:", review._id.toString());
    } else {
      console.log("Review already exists:", review._id.toString());
    }

    // ---------- 8. NOTIFICATION ----------
    let notification = await Notification.findOne({ userId: consumer._id });
    if (!notification) {
      notification = await Notification.create({
        userId: consumer._id,
        type: "booking_confirmation",
        message: "Your booking has been confirmed successfully.",
        isRead: false
      });
      console.log("Notification created:", notification._id.toString());
    } else {
      console.log("Notification already exists:", notification._id.toString());
    }

    console.log("\nALL TEST DATA READY — full flow verified.\n");
    process.exit(0);

  } catch (error) {
    console.error("Error creating test data:", error.message);
    process.exit(1);
  }
};

createTestData();