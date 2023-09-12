const mongoose = require("mongoose");

const helperSchema = new mongoose.Schema(
  {
    googleLink: {
      type: String,
      default: "https://play.google.com/store",
    },

    appleLink: {
        type: String,
        default: "https://www.apple.com/app-store",
      },

    aboutUsPage: {
      type: String,
      default: "<h1> About Us </h1>"
    },

    privacyPolicyPage: {
      type: String,
      default: "<h1> Privacy Policy </h1>"
    }
  },
  { timestamps: true }
);

const StaticPagesHelper = mongoose.model("StaticPagesHelper", helperSchema);

module.exports = StaticPagesHelper;
