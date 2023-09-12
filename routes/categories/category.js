const router = require("express").Router();
const {
  getCategories,
  addCategory,
  updateCategory,
  uploadCategoryImage,
} = require("../../controllers");

const {
  categoryImageUpload,
} = require("../../middlewares/categoryImageUpload");

// @Desc Get All Categories
// @Resquest [GET]
// @Route /api/category/all
router.get("/all", getCategories);

// @Desc Add new Category
// @Resquest [POST]
// @Route /api/category/new
router.post("/new", addCategory);

// @Desc Update a Category
// @Resquest [PATCH]
// @Route /api/category/update-category/:catId
router.patch("/update-category/:catId", updateCategory);

// @Desc Upload a Category Image
// @Resquest [PATCH]
// @Route /api/category/image-upload
router.patch("/image-upload", categoryImageUpload, uploadCategoryImage);

module.exports = router;
