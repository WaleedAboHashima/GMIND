const mongoose = require("mongoose");

const wordSearch = new mongoose.Schema({
  image: {
    type: String,
    default: "https://www.scarlettebooks.com/wp-content/uploads/2019/08/question-mark-500x333.jpg"
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  answer_def: {
    type: Array,
  },
  prize: {
    type: Number
  }
});

const WORDSEARCH = mongoose.model("wordseach", wordSearch);

module.exports = WORDSEARCH;