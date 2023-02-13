const router = require("express").Router();
const task = require("../controllers/task.controller");
const { auth } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/:boardId/task", [auth.verifyToken], task.createTask);
  router.get("/:boardId/tasks", [auth.verifyToken], task.getAllTasks);
  router.put("/:boardId/:id", [auth.verifyToken], task.editTask);

  app.use("/api/users", router);
};
