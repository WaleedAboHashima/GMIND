const router = require("express").Router();

const { getAllFeedbacks, addFeedback } = require("../../controllers");

// @Desc Fetch All Feedbacks
// @Resquest [GET]
// @Route /api/dashboard/feedback/all
router.get("/all", getAllFeedbacks);


// @Desc Add new feedback
// @Resquest [POST]
// @Route /api/dashboard/feedback/new
router.post("/new", addFeedback);

module.exports = router;
