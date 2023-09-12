const router = require("express").Router();

const {
  getQuestions,
  addQuestionBody,
  getQuestinOption,
  addQuestionOption,
  deleteQuestionOption,
  updateQuestion,
  updateAnswer,
} = require("../../controllers");

// @Desc Get All Categories
// @Resquest [GET]
// @Route /api/category/question/all/:levelId
router.get("/all/:levelId", getQuestions);

// @Desc Add new Level Question
// @Resquest [POST]
// @Route /api/category/question/new/:levelId
router.post("/new/:levelId", addQuestionBody);

// @Desc Update a Category
// @Resquest [PATCH]
// @Route /api/category/question/update-question/:questionId
router.patch("/update-question/:questionId", updateQuestion);

// @Desc Get All Question Options
// @Resquest [GET]
// @Route /api/category/question/options/:questionId
router.get("/options/:questionId", getQuestinOption);

// @Desc Add new Question Option
// @Resquest [POST]
// @Route /api/category/question/new/option/:questionId
router.post("/new/option/:questionId", addQuestionOption);

// @Desc Add new Question Option
// @Resquest [PATCH]
// @Route /api/category/question/update/answer/:questionId
router.patch("/update/answer/:questionId", updateAnswer);

// @Desc Delete a Question Option
// @Resquest [DELETE]
// @Route /api/category/question/del/option/:questionId
router.delete("/del/option/:questionId", deleteQuestionOption);

module.exports = router;
