const db = require("../models");
const User = db.User;
const Board = db.Board;
const Op = "Sequelize".Op;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: { username: req.body.username },
  });
  if (user) {
    res.status(400).json({ message: "Username already in use!" });
    return;
  }

  next();
};

checkDuplicateBoard = async (req, res, next) => {
  const board = await Board.findOne({
    where: { name: req.body.name },
  });
  if (board) {
    res.status(400).json({
      message: "Board with this name exists, add a prefix or change board name",
    });
    return;
  }
  next();
};

const verifyDuplicates = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateBoard,
};

module.exports = verifyDuplicates;
