const jwt = require("jsonwebtoken");
const  JWT_SECRET  = process.env.JWT_SECRET;
const tokeVerify = JWT_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Access Denied" });
    }
    const verfied = jwt.verify(token, tokeVerify);
    req.user = verfied;
    return next();
  } catch (err) {
    return res.status(401).send({ msg: `Invalid Token`, ERROR: err });
  }
}; // Check if the JWT didn't expire

module.exports = verifyToken;
