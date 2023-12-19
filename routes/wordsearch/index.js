const { AddQuestionToWordSearch, GetQuestions } = require("../../controllers/wordsearch");

const router = require("express").Router();

router.post('/new/question', AddQuestionToWordSearch);

router.get('/all/questions', GetQuestions);

module.exports = router;