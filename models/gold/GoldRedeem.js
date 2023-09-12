const mongoose = require("mongoose");

const redeemSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_email: { type: String, required: true },
    user_image: { type: String, required: true },
    redeemGift: { type: String, required: true },
    gold: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const GoldRedeem = mongoose.model("GoldRedeem", redeemSchema);

module.exports = GoldRedeem;
