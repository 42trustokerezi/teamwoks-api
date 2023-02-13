const db = require("../models");
const User = db.User;
const Board = db.Board;

exports.createBoard = (req, res) => {
  //console.log(req.userId);
  Board.create(
    {
      name: req.body.name,
      UserId: req.userId,
    },
    { include: User }
  )
    .then((board) => {
      res.status(200).json(board);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.getAllBoards = (req, res) => {
  Board.findAll({
    where: {
      UserId: req.userId,
    },
    include: User,
  })
    .then((board) => {
      res.status(200).json(board);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
