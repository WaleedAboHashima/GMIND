const router = require("express").Router();
const {
  getLevels,
  addLevel,
  updateLevel,
  uploadLevelImage,
} = require("../../controllers");
const { levelImageUpload } = require("../../middlewares/levelImageUpload");

// @Desc Get All Categories
// @Resquest [GET]
// @Route /api/category/level/all/:catId
router.get("/all/:catId", getLevels);

// @Desc Add new Category
// @Resquest [POST]
// @Route /api/category/level/new
router.post("/new", addLevel);

// @Desc Update a Category
// @Resquest [PATCH]
// @Route /api/category/level/update-level/:levelId
router.patch("/update-level/:levelId", updateLevel);

// @Desc Upload a Level Image
// @Resquest [PATCH]
// @Route /api/category/level/image-upload
router.patch("/image-upload", levelImageUpload, uploadLevelImage);

module.exports = router;
