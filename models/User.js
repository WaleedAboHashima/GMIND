const mongoose = require("mongoose");
const crypto = require("crypto");
const { baseURL } = process.env;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    referral_code: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      max: 100,
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Please enter a valid email",
      ],
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,

    resetLink: String,

    image: {
      type: String,
      default: `${baseURL}/user_default.png`,
    },

    points: {
      type: Number,
      default: 0,
    },

    gold: {
      type: Number,
      default: 0,
    },

    quizzes_played: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },
    EXP: {
      type: Number,
      default: 1,
    },
    NEXT_EXP_GOAL: {
      type: Number,
      default: 1000,
    },
    active: { type: Boolean, default: true },

    last_login: {
      day: { type: Number, default: 0 },
      month: { type: Number, default: 0 },
      year: { type: Number, default: 0 },
      timeStamp: { type: Date, default: Date.now() },
    },

    consecutive_days: { type: Number, default: 1 },

    opened_levels: [{ category: String, level: Number }],
    invited_by: {
      type: String,
    },
    users_invited: {type: Number, default: 0},
  },
  { timestamps: true }
);

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 20 * (60 * 1000); // Twenty Minutes

  return resetToken;
}; // Generates password reset Token

const User = mongoose.model("User", userSchema);
module.exports = User;
