const CRandomQuestion = require("../../models/competitions/CRandomQuestion");

module.exports = {
  getCompetitionRandomQuestions: async (req, res) => {
    try {
      await CRandomQuestion.find()
        .then(async (questions) => {
          res.status(200).json({
            success: true,
            message: "Random Questions Retrieved Successfully",
            result: questions,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Random Questions Can't be retrieved",
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

  addCompetitionRandomQuestionBody: async (req, res) => {
    try {
      const { body, category } = req.body;

      // Check Question Body
      if (!body) {
        return res.status(400).json({
          success: false,
          message: "The Question Can't be Empty",
        });
      }

      const newQuestion = new CRandomQuestion({ body, category });
      await newQuestion.save().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Question Not Added",
          ERROR: err,
        });
      });
      await CRandomQuestion.find()
        .then(async (questions) => {
          res.status(200).json({
            success: true,
            message: "Random Questions Retrieved Successfully",
            result: questions,
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

  getCompetitionRandomQuestinOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      await CRandomQuestion.findById({ _id: questionId })
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

  updateCompetitionRandomQuestion: async (req, res) => {
    try {
      const { body } = req.body;
      const { questionId } = req.params;

      await CRandomQuestion.findByIdAndUpdate({ _id: questionId }, { body })
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

  addCompetitionRandomQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { option } = req.body;

      await CRandomQuestion.findByIdAndUpdate(
        { _id: questionId },
        { $push: { options: { option } } }
      )
        .then(async () => {
          const questionAfter = await CRandomQuestion.findById({
            _id: questionId,
          });
          res.status(200).json({
            success: true,
            message: "Option Added Successfully",
            result: {
              options: questionAfter.options,
            },
          });
        })
        .catch((err) => {
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

  deleteCompetitionRandomQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { optionId } = req.body;

      await CRandomQuestion.findOneAndUpdate(
        { _id: questionId },
        { $pull: { options: { _id: optionId } } },
        { safe: true, multi: false }
      )
        .then(async () => {
          const questionAfter = await CRandomQuestion.findById({
            _id: questionId,
          });
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

  updateCompetitionRandomAnswer: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;

      await CRandomQuestion.findByIdAndUpdate({ _id: questionId }, { answer })
        .then(async () => {
          const questionAfter = await CRandomQuestion.findById({
            _id: questionId,
          });
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

  getCompetitionARandomQuestion: async (req, res) => {
    try {
      const { category } = req.params;
      await CRandomQuestion.find({ category })
        .then(async (questions) => {
          if (questions.length == 0) {
            return res.status(400).json({
              success: false,
              message: "Empty Question Stack",
            });
          }
          const questionsSize = questions.length;
          const idx = Math.floor(Math.random() * questionsSize);
          res.status(200).json({
            success: true,
            message: "A Random Question",
            result: questions[idx],
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Can't get a Random Question",
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
  }, // Get a Random Question
};
