const router = require("express").Router();
const {
  getCompetitionCategories,
  addCompetitionCategory,
  updateCompetitionCategory,
  uploadCompetitionCategoryImage,
} = require("../../controllers");

const {
  competitionImageUpload,
} = require("../../middlewares/competitionImageUpload");

// @Desc Get All Competition Categories
// @Resquest [GET]
// @Route /api/competition/all
router.get("/all", getCompetitionCategories);

// @Desc Add new Competition Category
// @Resquest [POST]
// @Route /api/competition/new
router.post("/new", addCompetitionCategory);

// @Desc Update a Competition Category
// @Resquest [PATCH]
// @Route /api/competition/update-category/:catId
router.patch("/update-category/:catId", updateCompetitionCategory);

// @Desc Upload a Competition Category Image
// @Resquest [PATCH]
// @Route /api/competition/image-upload
router.patch("/image-upload", competitionImageUpload, uploadCompetitionCategoryImage);

module.exports = router;
