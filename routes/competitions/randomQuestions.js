const router = require("express").Router();

const {
  getCompetitionRandomQuestions,
  addCompetitionRandomQuestionBody,
  getCompetitionRandomQuestinOption,
  addCompetitionRandomQuestionOption,
  deleteCompetitionRandomQuestionOption,
  updateCompetitionRandomQuestion,
  updateCompetitionRandomAnswer,
  getCompetitionARandomQuestion,
} = require("../../controllers");

// @Desc Get All Questions
// @Resquest [GET]
// @Route /api/competition/random-question/all
router.get("/all", getCompetitionRandomQuestions);

// @Desc Get All Categories
// @Resquest [GET]
// @Route /api/competition/random-question/:category
router.get("/:category", getCompetitionARandomQuestion);

// @Desc Add new Level Question
// @Resquest [POST]
// @Route /api/competition/random-question/new
router.post("/new", addCompetitionRandomQuestionBody);

// @Desc Update a Category
// @Resquest [PATCH]
// @Route /api/competition/random-question/update-question/:questionId
router.patch("/update-question/:questionId", updateCompetitionRandomQuestion);

// @Desc Get All Question Options
// @Resquest [GET]
// @Route /api/competition/random-question/options/:questionId
router.get("/options/:questionId", getCompetitionRandomQuestinOption);

// @Desc Add new Question Option
// @Resquest [POST]
// @Route /api/competition/random-question/new/option/:questionId
router.post("/new/option/:questionId", addCompetitionRandomQuestionOption);

// @Desc Add new Question Option
// @Resquest [PATCH]
// @Route /api/competition/random-question/update/answer/:questionId
router.patch("/update/answer/:questionId", updateCompetitionRandomAnswer);

// @Desc Delete a Question Option
// @Resquest [DELETE]
// @Route /api/competition/random-question/del/option/:questionId
router.delete("/del/option/:questionId", deleteCompetitionRandomQuestionOption);

module.exports = router;
