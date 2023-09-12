const router = require("express").Router();

// @Desc Auth APIs
// @Resquest [ALL]
// @Route /api/dashboard/user
router.use("/user", require("./user"));

// @Desc Admin Auth APIs
// @Resquest [ALL]
// @Route /api/dashboard/admin
router.use("/admin", require("./adminAuth"));

// @Desc Feedbacks APIs
// @Resquest [ALL]
// @Route /api/dashboard/feedback
router.use("/feedback", require("./feedback"));

module.exports = router;
