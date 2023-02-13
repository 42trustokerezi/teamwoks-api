const { read } = require("fs");
const { where } = require("sequelize");
const db = require("../models");
const Task = db.Task;
const Board = db.Board;

exports.createTask = (req, res) => {
  Task.create(
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      BoardId: req.params.boardId,
    },
    {
      include: Board,
    }
  )
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getAllTasks = (req, res) => {
  Task.findAll(
    {
      where: {
        BoardId: req.params.boardId,
      },
    },
    {
      include: Board,
    }
  )
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editTask = async (req, res) => {
  //   const task = await Task.update(
  //     {
  //       status: req.body.status,
  //     },
  //     {
  //       where: {
  //         id: req.params.id,
  //       },
  //     }
  //   );
  //   res.status(200).json(task);

  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });
  const updatedtask = await task.update({
    status: req.body.status,
  });
  res.status(200).json({
    id: task.id,
    title: task.title,
    description: task.description,
    status: updatedtask.status,
  });
};
