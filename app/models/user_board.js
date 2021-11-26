module.exports = (sequelize, DataTypes) => {
  const user_board = sequelize.define(
    'user_board',
    {
      board_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      owner: DataTypes.BOOLEAN,
    },
    {},
  );
  user_board.associate = (models) => {
    user_board.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    user_board.belongsTo(models.Board, {
      foreignKey: 'board_id',
      onDelete: 'CASCADE',
    });
  };
  return user_board;
};
