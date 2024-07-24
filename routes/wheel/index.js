const router = require("express").Router();

const { get_wheel_prizes , redeem_wheel_prize, SPIN_THE_WHEEL} = require("../../controllers/spinthewheel");

router.get("/prizes", get_wheel_prizes);
router.put('/redeem/:id', redeem_wheel_prize);
router.get('/spin', SPIN_THE_WHEEL)


module.exports = router;
