module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING
  }, {});
  Board.associate = (models) => {};
  return Board;
};