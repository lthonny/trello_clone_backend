module.exports = (sequelize, DataTypes) => {
  const user_board = sequelize.define('user_board', {
    board_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  user_board.associate = (models) => {
    user_board.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
    user_board.belongsTo(models.Board, {
      as: 'board',
      foreignKey: 'board_id',
    });
  };
  return user_board;
};