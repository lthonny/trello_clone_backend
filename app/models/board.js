module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING
  }, {});
  Board.associate = (models) => {
    // Board.belongsToMany(models.User, {
    //   through: models.user_board,
    // });
    Board.hasMany(models.user_board, {
      foreignKey: 'board_id',
    });
  };
  return Board;
};