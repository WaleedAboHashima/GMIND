const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    body: String,
    answer: String,
    options: [{ option: String }],
  },
  { timestamps: true }
);
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
