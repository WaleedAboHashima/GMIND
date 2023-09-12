const RandomQuestion = require("../../models/categories/RandomQuestion");

module.exports = {
  getRandomQuestions: async (req, res) => {
    try {
      await RandomQuestion.find()
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

  addRandomQuestionBody: async (req, res) => {
    try {
      const { body, category } = req.body;

      // Check Question Body
      if (!body) {
        return res.status(400).json({
          success: false,
          message: "The Question Can't be Empty",
        });
      }

      const newQuestion = new RandomQuestion({ body, category });
      await newQuestion.save().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Question Not Added",
          ERROR: err,
        });
      });
      await RandomQuestion.find()
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

  getRandomQuestinOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      await RandomQuestion.findById({ _id: questionId })
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

  updateRandomQuestion: async (req, res) => {
    try {
      const { body } = req.body;
      const { questionId } = req.params;

      await RandomQuestion.findByIdAndUpdate({ _id: questionId }, { body })
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

  addRandomQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { option } = req.body;

      await RandomQuestion.findByIdAndUpdate(
        { _id: questionId },
        { $push: { options: { option } } }
      )
        .then(async () => {
          const questionAfter = await RandomQuestion.findById({
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

  deleteRandomQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { optionId } = req.body;

      await RandomQuestion.findOneAndUpdate(
        { _id: questionId },
        { $pull: { options: { _id: optionId } } },
        { safe: true, multi: false }
      )
        .then(async () => {
          const questionAfter = await RandomQuestion.findById({
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

  updateRandomAnswer: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;

      await RandomQuestion.findByIdAndUpdate({ _id: questionId }, { answer })
        .then(async () => {
          const questionAfter = await RandomQuestion.findById({
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

  getARandomQuestion: async (req, res) => {
    try {
      const { category } = req.params;
      await RandomQuestion.find({ category })
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
