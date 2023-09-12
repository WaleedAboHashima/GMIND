const router = require("express").Router();
const { getLeaderBoard } = require("../../controllers");

// @Desc Get All Competition Categories
// @Resquest [GET]
// @Route /api/rank/leader-board
router.get("/leader-board", getLeaderBoard);

module.exports = router;
