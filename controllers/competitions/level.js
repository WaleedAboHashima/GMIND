const CCategory = require("../../models/competitions/CCategory");
const CLevel = require("../../models/competitions/CLevel");
const { baseURL } = process.env;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports = {
  getCompetitionLevels: async (req, res) => {
    try {
      await CCategory.findById({ _id: req.params.catId })
        .populate({ path: "level" })
        .then(async (categoryLevels) => {
          res.status(200).json({
            success: true,
            message: "Category Levels Retrieved Successfully",
            levels: categoryLevels.level,
            result: categoryLevels.level,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Category Levels Can't be retrieved",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Retrieve all Categories

  addCompetitionLevel: async (req, res) => {
    try {
      const { catId, levelNumber, gift } = req.body;
      const number = levelNumber;

      const lev = new CLevel({ number, gift });

      await lev
        .save()
        .then(async (levelData) => {
          await CCategory.findByIdAndUpdate(
            { _id: catId },
            { $push: { level: levelData._id } }
          ).then(() => {
            res.status(200).json({
              success: true,
              message: "Category Level Added Successful",
              result: {
                _id: lev._id,
                category: lev.number,
                gift: lev.gift,
                image: lev.image,
              },
            });
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Category Level not Added",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err.message,
      });
    }
  }, // Add New Level

  updateCompetitionLevel: async (req, res) => {
    try {
      const { number, gift, min_points } = req.body;
      const { levelId } = req.params;

      await CLevel.findByIdAndUpdate(
        { _id: levelId },
        { number, gift, min_points }
      )
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Level Updated Successful",
            result: { _id: levelId },
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Level not Updated",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err.message,
      });
    }
  }, // Update a Level

  uploadCompetitionLevelImage: async (req, res) => {
    try {
      const { levelId } = req.query;

      const unUpdatedLevel = await CLevel.findById({ _id: levelId });
      const oldPhotoPath = unUpdatedLevel.image;
      const oldPhotoName = path.basename(oldPhotoPath);

      if (oldPhotoName != "default.png") {
        fs.exists(`public/clevelImages/${oldPhotoName}`, function (exists) {
          if (exists) {
            console.log("File exists. Deleting now ... ", oldPhotoName);
            fs.unlinkSync(`public/clevelImages/${oldPhotoName}`);
          }
        });
      }

      await sharp(`public/clevelImages/${req.file.filename}`)
        .resize({ width: 100 })
        .toFile(`public/clevelImages/re-${req.file.filename}`)
        .catch((err) => console.log(err));

      fs.exists(`public/clevelImages/${req.file.filename}`, function (exists) {
        if (exists) {
          console.log("File exists. Deleting now ... ", req.file.filename);
          fs.unlinkSync(`public/clevelImages/${req.file.filename}`);
        }
      });

      const updatedLevel = await CLevel.findByIdAndUpdate(
        { _id: levelId },
        { image: `${baseURL}/clevelImages/re-` + req.file.filename },
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        result: {
          _id: updatedLevel._id,
          number: updatedLevel.number,
          imageURL: updatedLevel.image,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong, Try again later!",
        ERROR: err,
      });
    }
  }, // Upload Level Picture
};
