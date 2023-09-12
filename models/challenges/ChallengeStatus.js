const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      default: false,
      required: true,
    },

    gift: {
      type: String,
      default: "جائزة",
    },

    min_points: {
      type: Number,
      default: 10
    }
  },
  { timestamps: true }
);

const ChallengeStatus = mongoose.model("ChallengeStatus", statusSchema);

module.exports = ChallengeStatus;
