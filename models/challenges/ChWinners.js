const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_email: { type: String, required: true },
    user_image: { type: String, required: true },
    time: { type: Number, required: true, default: 0 },
    score: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const ChWinner = mongoose.model("ChWinner", winnerSchema);
module.exports = ChWinner;
