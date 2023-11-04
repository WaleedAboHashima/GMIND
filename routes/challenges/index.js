const router = require("express").Router();

const {
  toggleChallengeStatus,
  checkChallengeAndGetQuestions,
  updateChallengeGift,
} = require("../../controllers");
const {
  GetChallengeCategory,
  AddChallengeCategory,
} = require("../../controllers/challenges/category");
const imgUploader = require("../../middlewares/imgUploader");

const ImgUploader = require("../../middlewares/imgUploader");

// @Desc Notifications APIs
// @Resquest [ALL]
// @Route /api/challenge/notifications
router.use("/notifications", require("./notifications"));

// @Desc Questions APIs
// @Resquest [ALL]
// @Route /api/challenge/question
router.use("/question", require("./question"));

// @Desc winners APIs
// @Resquest [ALL]
// @Route /api/challenge/winners
router.use("/winners", require("./winners"));

// @Desc Toggle Status
// @Resquest [POST]
// @Route /api/challenge/toggle-status
router.post("/toggle-status", toggleChallengeStatus);

// @Desc Get status and questions
// @Resquest [POST]
// @Route /api/challenge/get-questions
router.get("/get-questions", checkChallengeAndGetQuestions);

// @Desc Update Gift
// @Resquest [PATCH]
// @Route /api/challenge/update-gift
router.patch("/update-gift", updateChallengeGift);
router.get("/category", GetChallengeCategory);
router.post("/category", imgUploader.fields([{ name: "image" ,maxCount:1}]), AddChallengeCategory);

module.exports = router;
