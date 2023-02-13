"use strict";

module.exports = (sequelize, Sequelize) => {
  const Board = sequelize.define("Board", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Board.associate = (models) => {
    models.Board.belongsTo(models.User);
    models.Board.hasMany(models.Task);
  };

  return Board;
};
