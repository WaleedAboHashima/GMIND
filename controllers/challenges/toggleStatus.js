const ChallengeStatus = require("../../models/challenges/ChallengeStatus");
const ChQuestion = require("../../models/challenges/ChQuestion");
const ChWinner = require("../../models/challenges/ChWinners");
const axios = require("axios");
const { baseURL } = process.env;

module.exports = {
  toggleChallengeStatus: async (req, res) => {
    try {
      const checkStatus = await ChallengeStatus.find();
      if (checkStatus.length == 0) {
        const newStatus = new ChallengeStatus({ status: false });
        await newStatus.save();
      }

      const getStatusId = await ChallengeStatus.find();
      var statusId = getStatusId[0];
      var oldStatus = statusId.status;
      statusId = statusId._id;

      if (!oldStatus) {
        ChWinner.collection.drop();

        await axios
          .post(`${baseURL}/api/challenge/notifications/all`, {
            title: "Cheer Up",
            body: "تم فتح تحدي جديد",
          })
          .catch((err) => {
            return res.status(400).json({
              success: false,
              message: "Can't send Notifications",
              ERROR: err,
            });
          });
      }

      await ChallengeStatus.findByIdAndUpdate(
        { _id: statusId },
        { status: !oldStatus }
      ).catch((err) => {
        res.status(400).json({
          success: false,
          message: "Can't change challenge status",
          ERROR: err,
        });
      });

      res.status(200).json({
        success: true,
        message: "Status changed and notifications sent successfully",
        result: { status: !oldStatus },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Hanle toggle status

  checkChallengeAndGetQuestions: async (req, res) => {
    try {
      var challenge = await ChallengeStatus.find().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Can't get challange status",
          ERROR: err,
        });
      });
      if (challenge.length == 0) {
        const newStatus = new ChallengeStatus({ status: false });
        await newStatus.save();
        challenge = newStatus;
      }
      challenge = challenge[0];

      if (challenge.status) {
        const questions = await ChQuestion.find()
          .sort({ _id: -1 })
          .catch((err) => {
            res.status(400).json({
              success: false,
              message: "Can't get challange questions",
              ERROR: err,
            });
          });

        return res.status(200).json({
          success: true,
          message: "Questions retrieved",
          result: {
            status: challenge.status,
            gift: challenge.gift,
            min_points: challenge.min_points,
            questions,
          },
        });
      }

      res.status(200).json({
        success: true,
        message: "Challenge is not active",
        result: {
          status: challenge.status,
          questions: [],
        },
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: toggleStatus.js ~ line 105 ~ checkChallengeAndGetQuestions: ~ err",
        err
      );
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later !",
        ERROR: err,
      });
    }
  }, // check challenge status and retrieve questions if status true

  updateChallengeGift: async (req, res) => {
    try {
      const { gift, min_points } = req.body;
      const checkStatus = await ChallengeStatus.find();
      if (checkStatus.length == 0) {
        const newStatus = new ChallengeStatus({ status: false });
        await newStatus.save();
      }

      var statusId = checkStatus[0];
      statusId = statusId._id;

      await ChallengeStatus.findByIdAndUpdate(
        { _id: statusId },
        { gift, min_points }
      ).catch((err) => {
        res.status(400).json({
          success: false,
          message: "Can't change challenge gift",
          ERROR: err,
        });
      });

      res.status(200).json({
        success: true,
        message: "Gift Updated",
        result: { gift },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // update challenge gift
};
