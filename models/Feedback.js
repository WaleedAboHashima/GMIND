const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    poster_id: { type: String, required: true },
    poster_name: { type: String, required: true },
    poster_phone: { type: String, required: true },
    poster_email: { type: String, required: true },
    poster_image: { type: String },
    post: { type: String, required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
