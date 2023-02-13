const users = require("../controllers/user.controller.js");
const router = require("express").Router();
const { verifyDuplicates } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //create new User
  router.post(
    "/",
    [verifyDuplicates.checkDuplicateUsernameOrEmail],
    users.createUser
  );

  //user signin
  router.post("/signin", users.signIn);

  app.use("/api/users", router);
};
