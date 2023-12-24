const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");

exports.levelCompleted = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { time, prize, score, max_score } = req.body;
  let levelUp = false;
  try {
    let penaltyPoints = Math.max(0, max_score - score);
    const foundUser = await User.findById(userId);
    // switch (true) {
    //   case time:
    if (!penaltyPoints) {
      foundUser.EXP += max_score * 5;
      foundUser.points += prize ? prize : max_score;
      if (foundUser.EXP > foundUser.NEXT_EXP_GOAL) {
        levelUp = true;
        foundUser.points += 200;
        foundUser.level = foundUser.level + 1;
        foundUser.EXP -= foundUser.NEXT_EXP_GOAL;
        foundUser.NEXT_EXP_GOAL += 750;
      }
    } else {
      let penaltyPrize = prize ? prize / max_score : 0;
      foundUser.points += penaltyPrize ? penaltyPrize * score : score;
      if (foundUser.EXP > foundUser.NEXT_EXP_GOAL) {
        levelUp = true;
        foundUser.points += 200;
        foundUser.level = foundUser.level + 1;
        foundUser.EXP -= foundUser.NEXT_EXP_GOAL;
        foundUser.NEXT_EXP_GOAL += 750;
      } else {
        foundUser.EXP += 5 * score;
      }
    }
    if (foundUser.points > 2000) {
      foundUser.gold += 200;
      foundUser.points -= 2000;
    }
    await foundUser.save();
    res.status(200).json({
      success: true,
      message: "User points added successfully",
      levelUp,
    });
    // break;
    // default:
    // break;
    // }
  } catch (err) {
    console.log(err.message);
  }
});

// 2000 Points => 200 Gold
// LEVELUP => 200 points
// leaderboard => Gold != Points
// Question => 1 point (Categories) / 10 EXP
// INITIAL EXP * QUESTION NUMBER => 5EXP STANDARD (10 question = 50exp)
