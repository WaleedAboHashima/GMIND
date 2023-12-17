const CQuestion = require("../../models/competitions/CQuestion");
const CLevel = require("../../models/competitions/CLevel");

module.exports = {
  getCompetitionQuestions: async (req, res) => {
    try {
      await CLevel.findById({ _id: req.params.levelId })
        .populate({ path: "question" })
        .then(async (levelQuestions) => {
          let shuffled = levelQuestions.question
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

          if (shuffled.length > 15) shuffled = shuffled.slice(0, 15);

          res.status(200).json({
            success: true,
            message: "Level Questions Retrieved Successfully",
            questions: shuffled,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Level Questions Can't be retrieved",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Get All The Question For a Level.

  addCompetitionQuestionBody: async (req, res) => {
    try {
      const { body } = req.body;
      const { levelId } = req.params;

      // Check Question Body
      if (!body) {
        return res.status(400).json({
          success: false,
          message: "The Question Can't be Empty",
        });
      }

      const newQuestion = new CQuestion({ body });
      newQuestion
        .save()
        .then(async (question) => {
          await CLevel.findByIdAndUpdate(
            { _id: levelId },
            { $push: { question: question._id } }
          ).catch((err) => {
            res.status(400).json({
              success: false,
              message: "Question Not Added",
              ERROR: err,
            });
          });
          await CLevel.findById({ _id: req.params.levelId })
            .populate({ path: "question" })
            .then(async (levelQuestions) => {
              res.status(200).json({
                success: true,
                message: "Question Added Successfully",
                levelQuestions: levelQuestions.question,
                result: levelQuestions.question,
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Question Not Added",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try agin later!",
        ERROR: err,
      });
    }
  }, // Add a new Question.

  getCompetitionQuestinOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      await CQuestion.findById({ _id: questionId })
        .then((questionOptions) => {
          res.status(200).json({
            success: true,
            message: "Options Retrieved Successfully",
            result: questionOptions,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Options not Retrieved",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Get All Options for a Question.

  updateCompetitionQuestion: async (req, res) => {
    try {
      const { body } = req.body;
      const { questionId } = req.params;

      await CQuestion.findByIdAndUpdate({ _id: questionId }, { body })
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Question Updated Successful",
            result: { _id: questionId },
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Question not Updated",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err.message,
      });
    }
  }, // Update a Question

  addCompetitionQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { option } = req.body;

      await CQuestion.findByIdAndUpdate(
        { _id: questionId },
        { $push: { options: { option } } }
      )
        .then(async () => {
          const questionAfter = await CQuestion.findById({ _id: questionId });
          res.status(200).json({
            success: true,
            message: "Option Added Successfully",
            result: {
              options: questionAfter.options,
            },
          });
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: question.js ~ line 163 ~ addCompetitionQuestionOption: ~ err",
            err
          );
          res.status(400).json({
            success: false,
            message: "Option not Added",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Add A new Option to a Question.

  deleteCompetitionQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { optionId } = req.body;

      await CQuestion.findOneAndUpdate(
        { _id: questionId },
        { $pull: { options: { _id: optionId } } },
        { safe: true, multi: false }
      )
        .then(async () => {
          const questionAfter = await CQuestion.findById({ _id: questionId });
          res.status(200).json({
            success: true,
            message: "Option Deleted Successfully",
            result: {
              options: questionAfter.options,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Option not Delted",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Delete an Option from a Question.

  updateCompetitionAnswer: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;

      await CQuestion.findByIdAndUpdate({ _id: questionId }, { answer })
        .then(async () => {
          const questionAfter = await CQuestion.findById({ _id: questionId });
          res.status(200).json({
            success: true,
            message: "Answer Updated Successfully",
            result: {
              options: questionAfter.options,
              answer: questionAfter.answer,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Answer not Updated",
            ERROR: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Update a Answer
};
