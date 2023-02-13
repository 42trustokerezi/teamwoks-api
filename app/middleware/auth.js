const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorised access" });
    }
    req.userId = decoded.id;

    next();
  });
};

const auth = {
  verifyToken,
};

module.exports = auth;
