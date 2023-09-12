const Category = require("../../models/categories/Category");
const Level = require("../../models/categories/Level");
const { baseURL } = process.env;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports = {
  getLevels: async (req, res) => {
    try {
      await Category.findById({ _id: req.params.catId })
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

  addLevel: async (req, res) => {
    try {
      const { catId, levelNumber } = req.body;
      const number = levelNumber;

      const lev = new Level({ number });

      await lev
        .save()
        .then(async (levelData) => {
          await Category.findByIdAndUpdate(
            { _id: catId },
            { $push: { level: levelData._id } }
          ).then(() => {
            res.status(200).json({
              success: true,
              message: "Category Level Added Successful",
              result: {
                _id: lev._id,
                category: lev.number,
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

  updateLevel: async (req, res) => {
    try {
      const { number } = req.body;
      const { levelId } = req.params;

      await Level.findByIdAndUpdate({ _id: levelId }, { number })
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

  uploadLevelImage: async (req, res) => {
    try {
      const { levelId } = req.query;

      const unUpdatedLevel = await Level.findById({ _id: levelId });
      const oldPhotoPath = unUpdatedLevel.image;
      const oldPhotoName = path.basename(oldPhotoPath);

      if (oldPhotoName != "default.png") {
        fs.exists(`public/levelImages/${oldPhotoName}`, function (exists) {
          if (exists) {
            console.log("File exists. Deleting now ... ", oldPhotoName);
            fs.unlinkSync(`public/levelImages/${oldPhotoName}`);
          }
        });
      }

      await sharp(`public/levelImages/${req.file.filename}`)
        .resize({ width: 100 })
        .toFile(`public/levelImages/re-${req.file.filename}`)
        .catch((err) => console.log(err));

      fs.exists(`public/levelImages/${req.file.filename}`, function (exists) {
        if (exists) {
          console.log("File exists. Deleting now ... ", req.file.filename);
          fs.unlinkSync(`public/levelImages/${req.file.filename}`);
        }
      });

      const updatedLevel = await Level.findByIdAndUpdate(
        { _id: levelId },
        { image: `${baseURL}/levelImages/re-` + req.file.filename },
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
