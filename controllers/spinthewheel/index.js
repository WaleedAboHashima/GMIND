const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const prizes = [
  {
    id: 1,
    name: "10 Point",
    label: "10 Point",
    quantity: 10,
    percentage: 0.6,
  },
  {
    id: 2,
    name: "x1 Key",
    label: "X 1",
    quantity: 1,
    percentage: 0.1,
  },
  {
    id: 3,
    name: "1000 Point",
    label: "1000 Point",
    quantity: 1000,
    percentage: 0.05,
  },
  {
    id: 4,
    name: "20 Min Time",
    label: "20M",
    quantity: 20,
    percentage: 0.2,
  },
  {
    id: 5,
    name: "50 Point",
    label: "50 Point",
    quantity: 50,
    percentage: 0.3,
  },
  {
    id: 6,
    name: "50 EGP",
    label: "50",
    quantity: 50,
    percentage: 0.01,
  },
  {
    id: 7,
    name: "10 Min",
    label: "10M",
    quantity: 10,
    percentage: 0.4,
  },
  {
    id: 8,
    name: "X5 Keys",
    label: "X 5",
    quantity: 5,
    percentage: 0.09,
  },
  {
    id: 9,
    name: "500 Point",
    label: "500 Point",
    quantity: 500,
    percentage: 0.10,
  },
  {
    id: 10,
    name: "30 Min",
    label: "30M",
    quantity: 30,
    percentage: 0.06,
  },
];

exports.get_wheel_prizes = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ success: true, prizes });
});

// User lives and timer for the wheel.

// User Object add new Spin Time, Spins left.

// Spins left in the res.


exports.SPIN_THE_WHEEL = expressAsyncHandler(async (req, res) => {
  const randomNum = Math.random();
  let cumulative = 0;
  for (const prize of prizes) {
    cumulative += prize.percentage;
    if (randomNum <= cumulative) {
      // const handler = prizeHandlers[prize.id];
      // if (handler) {
      //   return handler(req, res, prize);
      // }
      // const { percentage, ...noPercentagePrize } = prize;
      return res.status(200).json({ success: true, prize });
    }
  }
  res.status(500).json({ success: false, message: "No prize found" });
});

exports.redeem_wheel_prize = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({ success: false, message: "Invalid Id" });
  const prize = prizes.find((p) => p.id === parseInt(id));

  if (!prize)
    return res
      .status(404)
      .json({ success: false, message: "No Prize With This Id" });

  const handler = prizeHandlers[id];
  if (!handler)
    return res
      .status(404)
      .json({ success: false, message: "No Handler for this prize" });

  return handler(req, res, prize);
});

const handlePrize1 = expressAsyncHandler(async (req, res, prize) => {
  const { userId } = req.params;
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(404).json({ success: false, message: "User Not Found" });

  foundUser.points += prize.quantity;
  await foundUser.save();
  res.status(200).json({
    success: true,
    message: `User Points added ${prize.quantity} successfully`,
  });
});

const handlePrize2 = expressAsyncHandler(async (req, res, prize) => {
  res
    .status(200)
    .json({ success: true, message: `Handeled prize ${prize.name}` });
});
const handlePrize3 = expressAsyncHandler(async (req, res, prize) => {
  const { userId } = req.params;
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(404).json({ success: false, message: "User Not Found" });

  foundUser.points += prize.quantity;
  await foundUser.save();
  res.status(200).json({
    success: true,
    message: `User Points added ${prize.quantity} successfully`,
  });
});
const handlePrize4 = expressAsyncHandler(async (req, res, prize) => {
  res
    .status(200)
    .json({ success: true, message: `Handeled prize ${prize.name}` });
});
const handlePrize5 = expressAsyncHandler(async (req, res, prize) => {
  const { userId } = req.params;
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(404).json({ success: false, message: "User Not Found" });

  foundUser.points += prize.quantity;
  await foundUser.save();
  res.status(200).json({
    success: true,
    message: `User Points added ${prize.quantity} successfully`,
  });
});
const handlePrize6 = expressAsyncHandler(async (req, res, prize) => {
  res
    .status(200)
    .json({ success: true, message: `Handeled prize ${prize.name}` });
});
const handlePrize7 = expressAsyncHandler(async (req, res, prize) => {
  res
    .status(200)
    .json({ success: true, message: `Handeled prize ${prize.name}` });
});
const handlePrize8 = expressAsyncHandler(async (req, res, prize) => {
  res
    .status(200)
    .json({ success: true, message: `Handeled prize ${prize.name}` });
});
const handlePrize9 = expressAsyncHandler(async (req, res, prize) => {
  const { userId } = req.params;
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(404).json({ success: false, message: "User Not Found" });

  foundUser.points += prize.quantity;
  await foundUser.save();
  res.status(200).json({
    success: true,
    message: `User Points added ${prize.quantity} successfully`,
  });
});
const handlePrize10 = expressAsyncHandler(async (req, res, prize) => {
  res
    .status(200)
    .json({ success: true, message: `Handeled prize ${prize.name}` });
});

// prize handlers
const prizeHandlers = {
  1: handlePrize1,
  2: handlePrize2,
  3: handlePrize3,
  4: handlePrize4,
  5: handlePrize5,
  6: handlePrize6,
  7: handlePrize7,
  8: handlePrize8,
  9: handlePrize9,
  10: handlePrize10,
};

//
