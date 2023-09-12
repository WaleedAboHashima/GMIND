const mongoose = require("mongoose");
const { baseURL } = process.env;

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, unique: true, required: true },
    level: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CLevel",
      },
    ],
    image: { type: String, default: `${baseURL}/competitionImages/default.png` },
  },
  { timestamps: true }
);

const CCategory = mongoose.model("CCategory", categorySchema);
module.exports = CCategory;
