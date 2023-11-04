const mongoose = require("mongoose");

const challengeCSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
});

const ChallengeCategory = mongoose.model("ChallengeCategory", challengeCSchema);

module.exports = ChallengeCategory;
