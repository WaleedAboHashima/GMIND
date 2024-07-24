const router = require("express").Router();
const {
  getCompetitionLevels,
  addCompetitionLevel,
  updateCompetitionLevel,
  uploadCompetitionLevelImage,
} = require("../../controllers");
const { accessLevel } = require("../../controllers/competitions/level");
const { clevelImageUpload } = require("../../middlewares/clevelImageUpload");

// @Desc Get All Competition Categories
// @Resquest [GET]
// @Route /api/competition/level/all/:catId
router.get("/all/:catId", getCompetitionLevels);

// @Desc Add new Competition Category
// @Resquest [POST]
// @Route /api/competition/level/new
router.post("/new", addCompetitionLevel);

// @Desc Update a Competition Category
// @Resquest [PATCH]
// @Route /api/competition/level/update-level/:levelId
router.patch("/update-level/:levelId", updateCompetitionLevel);

// @Desc Upload a Competition Level Image
// @Resquest [PATCH]
// @Route /api/competition/level/image-upload
router.patch("/image-upload", clevelImageUpload, uploadCompetitionLevelImage);
router.put("/access-level/:levelId/:userId", accessLevel)
module.exports = router;
