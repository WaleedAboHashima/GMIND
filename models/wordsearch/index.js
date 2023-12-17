const mongoose = require("mongoose");

const wordSearch = new mongoose.Schema({
  image: {
    Type: String,
  },
  question: {
    Type: String,
  },
  answer: {
    type: String,
  },
  answer_def: {
    type: Array,
  },
});
