const mongoose = require("mongoose");
const { baseURL } = process.env;

const levelSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    image: { type: String, default: `${baseURL}/levelImages/default.png` },
  },
  { timestamps: true }
);

const Level = mongoose.model("Level", levelSchema);
module.exports = Level;
