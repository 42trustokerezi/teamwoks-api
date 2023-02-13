"use strict";

module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("Task", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("todo", "doing", "done"),
      defaultValue: "todo",
    },
  });

  Task.associate = (models) => {
    models.Task.belongsTo(models.Board);
  };

  return Task;
};
