const router = require("express").Router();

const { getRedeemRequests, addGoldReedeem, updateRedeemGoldStatus, deleteRedeemRequest } = require("../../controllers");

// @Desc Get All Redeem Requests
// @Resquest [GET]
// @Route /api/redeem-gold/requests
router.get("/requests", getRedeemRequests);

// @Desc Request a redeem
// @Resquest [POST]
// @Route /api/redeem-gold/request/:userId
router.post("/request/:userId", addGoldReedeem);

// @Desc Request a redeem
// @Resquest [POST]
// @Route /api/redeem-gold/request/:userId
router.patch("/request/:userId", updateRedeemGoldStatus);

// @Desc Request a redeem
// @Resquest [DELETE]
// @Route /api/redeem-gold/request/:userId
router.delete("/request/:userId", deleteRedeemRequest);

module.exports = router;
