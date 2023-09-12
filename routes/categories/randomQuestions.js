const router = require("express").Router();

const {
  getRandomQuestions,
  addRandomQuestionBody,
  getRandomQuestinOption,
  addRandomQuestionOption,
  deleteRandomQuestionOption,
  updateRandomQuestion,
  updateRandomAnswer,
  getARandomQuestion,
} = require("../../controllers");

// @Desc Get All Questions
// @Resquest [GET]
// @Route /api/category/random-question/all
router.get("/all", getRandomQuestions);

// @Desc Get All Categories
// @Resquest [GET]
// @Route /api/category/random-question/:category
router.get("/:category", getARandomQuestion);

// @Desc Add new Level Question
// @Resquest [POST]
// @Route /api/category/random-question/new
router.post("/new", addRandomQuestionBody);

// @Desc Update a Category
// @Resquest [PATCH]
// @Route /api/category/random-question/update-question/:questionId
router.patch("/update-question/:questionId", updateRandomQuestion);

// @Desc Get All Question Options
// @Resquest [GET]
// @Route /api/category/random-question/options/:questionId
router.get("/options/:questionId", getRandomQuestinOption);

// @Desc Add new Question Option
// @Resquest [POST]
// @Route /api/category/random-question/new/option/:questionId
router.post("/new/option/:questionId", addRandomQuestionOption);

// @Desc Add new Question Option
// @Resquest [PATCH]
// @Route /api/category/random-question/update/answer/:questionId
router.patch("/update/answer/:questionId", updateRandomAnswer);

// @Desc Delete a Question Option
// @Resquest [DELETE]
// @Route /api/category/random-question/del/option/:questionId
router.delete("/del/option/:questionId", deleteRandomQuestionOption);

module.exports = router;
