const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingid: {
      type: String,
      unique: true
    },

    vehicleid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startdatetime: {
      type: Date,
      required: true
    },

    enddatetime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      required: true,
      default: "pending"
    },

    totalamount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);