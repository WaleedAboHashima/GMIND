const router = require("express").Router();
const {
  getCompetitionWinners,
  addCompetitionWinners,
  updateCompetitionWinnerStatus,
  deleteCompetitionWinner,
} = require("../../controllers");

// @Desc Get All Competition Winners
// @Resquest [GET]
// @Route /api/competition/winners/all
router.get("/all", getCompetitionWinners);

// @Desc Add new Competition Winners
// @Resquest [POST]
// @Route /api/competition/winners/new
router.post("/new", addCompetitionWinners);

// @Desc Update Status for Competition Winners
// @Resquest [PATCH]
// @Route /api/competition/winners/update-status/:winnerId
router.patch("/update-status/:winnerId", updateCompetitionWinnerStatus);

// @Desc Delete for Competition Winners
// @Resquest [DELETE]
// @Route /api/competition/winners/delete/:winnerId
router.delete("/delete/:winnerId", deleteCompetitionWinner);

module.exports = router;
