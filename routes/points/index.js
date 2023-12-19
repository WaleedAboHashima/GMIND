const router = require("express").Router();


const { levelCompleted } = require("../../controllers/points");


router.post('/completed/:userId', levelCompleted)

module.exports = router;