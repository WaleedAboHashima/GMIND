const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    body: String,
    answer: String,
    options: [{ option: String }],
    category: {type: String, default: "Random"}
  },
  { timestamps: true }
);
const CRandomQuestion = mongoose.model("CRandomQuestion", questionSchema);
module.exports = CRandomQuestion;
