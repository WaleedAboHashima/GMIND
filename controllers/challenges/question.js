const ChQuestion = require("../../models/challenges/ChQuestion");
const ChallengeStatus = require("../../models/challenges/ChallengeStatus");

module.exports = {
  getChallengeQuestions: async (req, res) => {
    try {
      const questions = await ChQuestion.find().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Level Questions Can't be retrieved",
          ERROR: err,
        });
      });

      const getStatus = await ChallengeStatus.find();
      var status = getStatus[0];
      var gift = status.gift;
      var min_points = status.min_points;
      status = status.status;

      res.status(200).json({
        success: true,
        message: "Questions Retrieved Successfully",
        result: { status, gift, min_points, questions },
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Get All The Question For a Level.

  addChallengeQuestionBody: async (req, res) => {
    try {
      const { body } = req.body;

      // Check Question Body
      if (!body) {
        return res.status(400).json({
          success: false,
          message: "The Question Can't be Empty",
        });
      }

      const newQuestion = new ChQuestion({ body });
      await newQuestion.save().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Question Not Added",
          ERROR: err,
        });
      });

      const questions = await ChQuestion.find().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Level Questions Can't be retrieved",
          ERROR: err,
        });
      });

      res.status(200).json({
        success: true,
        message: "Question Added Successfully",
        result: questions,
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: question.js ~ line 69 ~ addChallengeQuestionBody: ~ err",
        err
      );
      res.status(500).json({
        success: false,
        message: "Something went wrong try agin later!",
        ERROR: err,
      });
    }
  }, // Add a new Question.

  getChallengeQuestinOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      await ChQuestion.findById({ _id: questionId })
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

  updateChallengeQuestion: async (req, res) => {
    try {
      const { body } = req.body;
      const { questionId } = req.params;

      await ChQuestion.findByIdAndUpdate({ _id: questionId }, { body })
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

  addChallengeQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { option } = req.body;

      await ChQuestion.findByIdAndUpdate(
        { _id: questionId },
        { $push: { options: { option } } }
      )
        .then(async () => {
          const questionAfter = await ChQuestion.findById({ _id: questionId });
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

  deleteChallengeQuestionOption: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { optionId } = req.body;

      await ChQuestion.findOneAndUpdate(
        { _id: questionId },
        { $pull: { options: { _id: optionId } } },
        { safe: true, multi: false }
      ).catch((err) => {
        res.status(400).json({
          success: false,
          message: "Option not Delted",
          ERROR: err,
        });
      });
      const questionAfter = await ChQuestion.findById({ _id: questionId });
      res.status(200).json({
        success: true,
        message: "Option Deleted Successfully",
        result: {
          options: questionAfter.options,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Delete an Option from a Question.

  updateChallengeAnswer: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;

      await ChQuestion.findByIdAndUpdate({ _id: questionId }, { answer })
        .then(async () => {
          const questionAfter = await ChQuestion.findById({ _id: questionId });
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
