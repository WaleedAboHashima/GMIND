const router = require("express").Router();

const { addChallengeWinners, getChallengeRank } = require("../../controllers");

// @Desc Add new winner
// @Resquest [POST]
// @Route /api/challenge/winners/new/:userId
router.post("/new/:userId", addChallengeWinners);

// @Desc get rank
// @Resquest [POST]
// @Route /api/challenge/winners/all
router.get("/all", getChallengeRank);

module.exports = router;
