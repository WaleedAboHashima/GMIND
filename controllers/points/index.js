const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");

exports.levelCompleted = expressAsyncHandler(async (req, res) => {
  const { userId, type } = req.params;
  const { time, prize, score, max_score } = req.body;
  if (!time || !prize || !score || !max_score)
    return res
      .status(200)
      .json({ success: false, message: "All fields are reqired" });
  let levelUp = false;
  try {
    let penaltyPoints = Math.max(0, max_score - score);
    const foundUser = await User.findById(userId);
    if (type === "challenges") {
      switch (true) {
        case time <= 10:
          if (!penaltyPoints) {
            foundUser.EXP += 500;
            foundUser.points += prize;
            if (foundUser.EXP > foundUser.NEXT_EXP_GOAL) {
              levelUp = true;
              foundUser.points += 200;
              foundUser.level = foundUser.level + 1;
              foundUser.EXP = 1;
              foundUser.NEXT_EXP_GOAL += 1000;
            }
          } else {
            let penaltyPrize = prize / max_score;
            foundUser.points += penaltyPrize * score;
            if (foundUser.EXP > foundUser.NEXT_EXP_GOAL) {
              levelUp = true;
              foundUser.level = foundUser.level + 1;
              foundUser.EXP = 1;
              foundUser.NEXT_EXP_GOAL += 1000;
            } else {
              foundUser.EXP += 250;
            }
          }
          await foundUser.save();
          res.status(200).json({
            success: true,
            message: "User points added successfully",
            levelUp,
          });
          break;
        default:
          console.log("default");
          break;
        case 10 < time <= 15:
          foundUser.EXP += 250;
          foundUser.points += prize - 5;
          if (foundUser.EXP > foundUser.NEXT_EXP_GOAL) {
            levelUp = true;
            foundUser.points += 10;
            foundUser.level = foundUser.level + 1;
            foundUser.EXP = 1;
            foundUser.NEXT_EXP_GOAL += 1000;
          }
          await foundUser.save();
          res.status(200).json({
            success: true,
            message: "User points added successfully",
            levelUp,
          });
          break;
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});


// 2000 Points => 200 Gold
// LEVELUP => 200 points
// leaderboard => Gold != Points
// Question => 1 point (Categories) / 10 EXP
// INITIAL EXP * QUESTION NUMBER => 5EXP STANDARD (10 question = 50exp)