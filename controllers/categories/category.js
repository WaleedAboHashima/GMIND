const Category = require("../../models/categories/Category");
const { baseURL } = process.env;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find().sort({ _id: -1 });
      res.status(200).json({ success: true, result: categories });
    } catch (err) {
      res.status(500).send({
        success: false,
        ERROR: err,
        message: "Something went wrong try again later!",
      });
    }
  }, // Retrieve all Categories

  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const category = categoryName;

      // Check if Category With the same name Exists
      const checkCat = await Category.findOne({ category });
      if (checkCat) {
        return res.status(409).json({
          success: false,
          message: "Category with the same name already exists",
        });
      }

      const cat = new Category({
        category,
      });

      await cat
        .save()
        .then((newCat) => {
          res.status(201).json({
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

  updateCategory: async (req, res) => {
    try {
      const { category } = req.body;
      await Category.findByIdAndUpdate(req.params.catId, { category });
      res
        .status(202)
        .json({ success: true, result: { _id: req.params.catId } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, //Update a Category

  uploadCategoryImage: async (req, res) => {
    try {
      const { catId } = req.query;

      const unUpdatedCat = await Category.findById({ _id: catId });
      const oldPhotoPath = unUpdatedCat.image;
      const oldPhotoName = path.basename(oldPhotoPath);

      if (oldPhotoName != "default.png") {
        fs.exists(`public/categoryImages/${oldPhotoName}`, function (exists) {
          if (exists) {
            console.log("File exists. Deleting now ... ", oldPhotoName);
            fs.unlinkSync(`public/categoryImages/${oldPhotoName}`);
          }
        });
      }

      await sharp(`public/categoryImages/${req.file.filename}`)
        .resize({ width: 100 })
        .toFile(`public/categoryImages/re-${req.file.filename}`)
        .catch((err) => console.log(err));

      fs.exists(
        `public/categoryImages/${req.file.filename}`,
        function (exists) {
          if (exists) {
            console.log("File exists. Deleting now ... ", req.file.filename);
            fs.unlinkSync(`public/categoryImages/${req.file.filename}`);
          }
        }
      );

      const updatedCat = await Category.findByIdAndUpdate(
        { _id: catId },
        { image: `${baseURL}/categoryImages/re-` + req.file.filename },
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
