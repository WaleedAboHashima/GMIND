const router = require("express").Router();

const {
  getChallengeQuestions,
  addChallengeQuestionBody,
  getChallengeQuestinOption,
  addChallengeQuestionOption,
  deleteChallengeQuestionOption,
  updateChallengeQuestion,
  updateChallengeAnswer,
} = require("../../controllers");

// @Desc Get All Questions
// @Resquest [GET]
// @Route /api/challenge/question/all
router.get("/all", getChallengeQuestions);

// @Desc Add new Level Question
// @Resquest [POST]
// @Route /api/challenge/question/new
router.post("/new", addChallengeQuestionBody);

// @Desc Update a challenge
// @Resquest [PATCH]
// @Route /api/challenge/question/update-question/:questionId
router.patch("/update-question/:questionId", updateChallengeQuestion);

// @Desc Get All Question Options
// @Resquest [GET]
// @Route /api/challenge/question/options/:questionId
router.get("/options/:questionId", getChallengeQuestinOption);

// @Desc Add new Question Option
// @Resquest [POST]
// @Route /api/challenge/question/new/option/:questionId
router.post("/new/option/:questionId", addChallengeQuestionOption);

// @Desc Add new Question Option
// @Resquest [PATCH]
// @Route /api/challenge/question/update/answer/:questionId
router.patch("/update/answer/:questionId", updateChallengeAnswer);

// @Desc Delete a Question Option
// @Resquest [DELETE]
// @Route /api/challenge/question/del/option/:questionId
router.delete("/del/option/:questionId", deleteChallengeQuestionOption);

module.exports = router;
