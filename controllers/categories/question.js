const Question = require("../../models/categories/Question");
const Level = require("../../models/categories/Level");

module.exports = {
  getQuestions: async (req, res) => {
    try {
      await Level.findById({ _id: req.params.levelId })
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
            result: levelQuestions.question,
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

  addQuestionBody: async (req, res) => {
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

      const newQuestion = new Question({ body });
      newQuestion
        .save()
        .then(async (question) => {
          await Level.findByIdAndUpdate(
            { _id: levelId },
            { $push: { question: question._id } }
          ).catch((err) => {
            res.status(400).json({
              success: false,
              message: "Question Not Added",
              ERROR: err,
            });
          });
          await Level.findById({ _id: req.params.levelId })
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

  getQuestinOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      await Question.findById({ _id: questionId })
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

  updateQuestion: async (req, res) => {
    try {
      const { body } = req.body;
      const { questionId } = req.params;

      await Question.findByIdAndUpdate({ _id: questionId }, { body })
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

  addQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { option } = req.body;

      await Question.findByIdAndUpdate(
        { _id: questionId },
        { $push: { options: { option } } }
      )
        .then(async () => {
          const questionAfter = await Question.findById({ _id: questionId });
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

  deleteQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { optionId } = req.body;

      await Question.findOneAndUpdate(
        { _id: questionId },
        { $pull: { options: { _id: optionId } } },
        { safe: true, multi: false }
      )
        .then(async () => {
          const questionAfter = await Question.findById({ _id: questionId });
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

  updateAnswer: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;

      await Question.findByIdAndUpdate({ _id: questionId }, { answer })
        .then(async () => {
          const questionAfter = await Question.findById({ _id: questionId });
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
