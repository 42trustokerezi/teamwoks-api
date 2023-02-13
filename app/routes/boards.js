const router = require("express").Router();
const boards = require("../controllers/board.controller");
const { auth, verifyDuplicates } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/board",
    [auth.verifyToken, verifyDuplicates.checkDuplicateBoard],
    boards.createBoard
  );
  router.get("/boards", [auth.verifyToken], boards.getAllBoards);
  app.use("/api/users", router);
};
