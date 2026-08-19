const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentid: {
      type: String,
      unique: true
    },

    bookingid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentstatus: {
      type: String,
      required: true,
      default: "pending"
    },

    paymentdate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payment", paymentSchema);