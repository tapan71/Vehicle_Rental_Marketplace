const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminid: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    emailid: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Admin", adminSchema);