const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// const nodemailer = require("nodemailer");
const { transporter } = require("../services/email.service");

//Create new user

exports.createUser = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(function (user) {
      res.status(200).json(user);
    })
    .then(() => {
      const options = {
        from: "trustokerezi42@gmail.com",
        to: req.body.email,
        subject: "user signup successfull",
        text: "your signup was successful",
      };

      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Email sent:" + info.response);
      });
    });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(function (user, err) {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    let validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: token,
    });
  });
};
