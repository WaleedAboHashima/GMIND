const {
  AddQuestionToWordSearch,
  GetQuestions,
  DeleteQuestion
} = require("../../controllers/wordsearch");

const router = require("express").Router();
const imgUploader = require("../../middlewares/imgUploader");

router.post(
  "/new/question",
  imgUploader.fields([{ name: "image", maxCount: 1 }]),
  AddQuestionToWordSearch
);

router.get("/all/questions", GetQuestions);
router.delete("/delete/question/:id", DeleteQuestion);

module.exports = router;
