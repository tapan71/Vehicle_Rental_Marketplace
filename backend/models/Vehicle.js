const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleid: {
      type: String,
      unique: true
    },

    brand: {
      type: String,
      required: true
    },

    model: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      required: true,
      default: "available"
    },

    year: {
      type: Number,
      required: true
    },

    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);