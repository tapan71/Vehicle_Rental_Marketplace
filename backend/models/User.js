const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["customer", "owner", "admin"],
      default: "customer"
    },

    licenseid: {
      type: String
    },

    licenseStatus: {
      type: String,
      enum: ["not_uploaded", "pending", "verified", "rejected"],
      default: "not_uploaded"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);