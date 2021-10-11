module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING
  }, {});
  Board.associate = (models) => {
    Board.hasMany(models.user_board, {
      foreignKey: 'board_id',
      onDelete: 'CASCADE'
    });
    Board.hasMany(models.Task, {
      foreignKey: 'board_id',
      onDelete: 'CASCADE'
    });
  };
  return Board;
};