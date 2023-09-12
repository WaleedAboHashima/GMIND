const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 50, required: true },

    email: {
      type: String,
      max: 100,
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Please enter a valid email",
      ],
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    active: { type: Boolean, default: true },

    photoURL: { type: String, default: "" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
