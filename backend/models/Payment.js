const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      required: true,
      default: "pending"
    },

    paymentDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payment", paymentSchema);