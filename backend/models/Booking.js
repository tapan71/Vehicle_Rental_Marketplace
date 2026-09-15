const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startDateTime: {
      type: Date,
      required: true
    },

    endDateTime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      required: true,
      default: "pending"
    },

    totalAmount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);