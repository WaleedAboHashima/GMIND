const expressAsyncHandler = require("express-async-handler");
const ChallengeCategory = require("../../models/challenges/ChallengeCategory");
const cloundinary = require("cloudinary").v2;
require("dotenv").config();
cloundinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.GetChallengeCategory = expressAsyncHandler(async (req, res) => {
  try {
    await ChallengeCategory.find({}).then((cc) =>
      res.status(200).json({ success: true, categories: cc })
    );
  } catch (err) {
    res.status(500).json({ success: false, messag: err.message });
  }
});

exports.AddChallengeCategory = expressAsyncHandler(async (req, res) => {
  try {
    const image = (await cloundinary.uploader.upload(req.files.image[0].path))
      .secure_url;
    await ChallengeCategory.create({
      image: image,
      name: "تحدي السرعه",
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ success: false, messag: err.message });
  }
});
