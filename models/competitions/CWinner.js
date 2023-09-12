const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_email: { type: String, required: true },
    user_image: { type: String, required: true },
    gift: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CWinner = mongoose.model("CWinner", winnerSchema);
module.exports = CWinner;
