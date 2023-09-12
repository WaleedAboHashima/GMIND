const CCategory = require("../../models/competitions/CCategory");
const { baseURL } = process.env;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports = {
  getCompetitionCategories: async (req, res) => {
    try {
      const categories = await CCategory.find().sort({ _id: -1 });
      res.status(200).json({ success: true, result: categories });
    } catch (err) {
      res.status(500).send({
        success: false,
        ERROR: err,
        message: "Something went wrong try again later!",
      });
    }
  }, // Retrieve all Categories

  addCompetitionCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const category = categoryName;

      // Check if Category With the same name Exists
      const checkCat = await CCategory.findOne({ category });
      if (checkCat) {
        return res.status(400).json({
          success: false,
          message: "Category with the same name already exists",
        });
      }

      const cat = new CCategory({
        category,
      });

      await cat
        .save()
        .then((newCat) => {
          res.status(200).json({
            success: true,
            message: "Category Added Successful",
            result: {
              _id: newCat._id,
              category: newCat.category,
              image: newCat.image,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Category not Added",
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
  }, // Add New Category

  updateCompetitionCategory: async (req, res) => {
    try {
      const { category } = req.body;
      await CCategory.findByIdAndUpdate(req.params.catId, { category });
      res
        .status(200)
        .json({ success: true, result: { _id: req.params.catId } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, //Update a Category

  uploadCompetitionCategoryImage: async (req, res) => {
    try {
      const { catId } = req.query;

      const unUpdatedCat = await CCategory.findById({ _id: catId });
      const oldPhotoPath = unUpdatedCat.image;
      const oldPhotoName = path.basename(oldPhotoPath);

      if (oldPhotoName != "default.png") {
        fs.exists(
          `public/competitionImages/${oldPhotoName}`,
          function (exists) {
            if (exists) {
              console.log("File exists. Deleting now ... ", oldPhotoName);
              fs.unlinkSync(`public/competitionImages/${oldPhotoName}`);
            }
          }
        );
      }

      await sharp(`public/competitionImages/${req.file.filename}`)
        .resize({ width: 100 })
        .toFile(`public/competitionImages/re-${req.file.filename}`)
        .catch((err) => console.log(err));

      fs.exists(
        `public/competitionImages/${req.file.filename}`,
        function (exists) {
          if (exists) {
            console.log("File exists. Deleting now ... ", req.file.filename);
            fs.unlinkSync(`public/competitionImages/${req.file.filename}`);
          }
        }
      );

      const updatedCat = await CCategory.findByIdAndUpdate(
        { _id: catId },
        { image: `${baseURL}/competitionImages/re-` + req.file.filename },
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        result: {
          _id: updatedCat._id,
          category: updatedCat.category,
          imageURL: updatedCat.image,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong, Try again later!",
        ERROR: err,
      });
    }
  }, // Upload Category Picture
};
