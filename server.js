const express = require("express");
const app = express();
const connection = require("./app/models");
const dotenv = require("dotenv");
const { sequelize } = require("./app/models");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.sequelize.sync().then(() => {
  console.log("db connected successfully");
});

app.get("/", (req, res) => {
  res.send("hello and welcome to teamworks api");
});

require("./app/routes/users")(app);
require("./app/routes/boards")(app);
require("./app/routes/tasks")(app);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT} `);
});
