module.exports = (sequelize, DataTypes) => {
  const user_board = sequelize.define('user_board', {
    board_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  user_board.associate = (models) => {
    user_board.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    user_board.belongsTo(models.Board, {
      foreignKey: 'board_id',
    });
  };
  return user_board;
};