module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board', {
      title: DataTypes.STRING,
    }, {},
  );
  Board.associate = (models) => {
    Board.hasOne(models.Invites, { foreignKey: 'id', onDelete: 'CASCADE' });
    // Board.belongsToMany(models.User, { through: models.user_board });

    // Board.hasMany(models.Task, { foreignKey: 'board_id', onDelete: 'CASCADE' });
    // Board.belongsTo(models.Task, { foreignKey: 'board_id', onDelete: 'CASCADE' });

    Board.hasMany(models.Task, { foreignKey: 'board_id', onDelete: 'CASCADE' });
    Board.hasMany(models.user_board, { foreignKey: 'board_id', onDelete: 'CASCADE' });


    Board.belongsToMany(models.User, {
      foreignKey: 'id',
      through: models.user_board,
      onDelete: 'CASCADE'
    });
    // Board.belongsTo(models.User, { foreignKey: 'board_id', through: models.user_Board, onDelete: 'CASCADE' });
  };
  return Board;
};
