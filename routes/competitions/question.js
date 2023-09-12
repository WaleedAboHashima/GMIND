const router = require("express").Router();

const {
  getCompetitionQuestions,
  addCompetitionQuestionBody,
  getCompetitionQuestinOption,
  addCompetitionQuestionOption,
  deleteCompetitionQuestionOption,
  updateCompetitionQuestion,
  updateCompetitionAnswer,
} = require("../../controllers");

// @Desc Get All Competition Categories
// @Resquest [GET]
// @Route /api/competition/question/all/:levelId
router.get("/all/:levelId", getCompetitionQuestions);

// @Desc Add new Level Competition Question
// @Resquest [POST]
// @Route /api/competition/question/new/:levelId
router.post("/new/:levelId", addCompetitionQuestionBody);

// @Desc Update a Competition Category
// @Resquest [PATCH]
// @Route /api/competition/question/update-question/:questionId
router.patch("/update-question/:questionId", updateCompetitionQuestion);

// @Desc Get All Competition Question Options
// @Resquest [GET]
// @Route /api/competition/question/options/:questionId
router.get("/options/:questionId", getCompetitionQuestinOption);

// @Desc Add new Competition Question Option
// @Resquest [POST]
// @Route /api/competition/question/new/option/:questionId
router.post("/new/option/:questionId", addCompetitionQuestionOption);

// @Desc Add new Competition Question Option
// @Resquest [PATCH]
// @Route /api/competition/question/update/answer/:questionId
router.patch("/update/answer/:questionId", updateCompetitionAnswer);

// @Desc Delete a Competition Question Option
// @Resquest [DELETE]
// @Route /api/competition/question/del/option/:questionId
router.delete("/del/option/:questionId", deleteCompetitionQuestionOption);

module.exports = router;
