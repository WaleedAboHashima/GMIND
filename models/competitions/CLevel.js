const mongoose = require("mongoose");
const { baseURL } = process.env;

const levelSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: "CQuestion" }],
    image: { type: String, default: `${baseURL}/clevelImages/default.png` },
    gift: { type: String, required: true, default: "جائزة" },
    min_points: { type: Number, required: true, default: 10 },
  },
  { timestamps: true }
);

const CLevel = mongoose.model("CLevel", levelSchema);
module.exports = CLevel;
