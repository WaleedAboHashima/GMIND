const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    body: String,
    answer: String,
    options: [{ option: String }],
  },
  { timestamps: true }
);
const ChQuestion = mongoose.model("ChQuestion", questionSchema);
module.exports = ChQuestion;