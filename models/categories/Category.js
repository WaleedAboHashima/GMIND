const mongoose = require("mongoose");
const { baseURL } = process.env;

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, unique: true, required: true },
    level: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
      },
    ],
    image: { type: String, default: `${baseURL}/categoryImages/default.png` },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
