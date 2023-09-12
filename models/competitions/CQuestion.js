const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    body: String,
    answer: String,
    options: [{ option: String }],
  },
  { timestamps: true }
);
const CQuestion = mongoose.model("CQuestion", questionSchema);
module.exports = CQuestion;
