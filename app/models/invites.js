module.exports = (sequelize, DataTypes) => {
  const Invites = sequelize.define(
    'Invites', {
      board_id: DataTypes.INTEGER,
      key: DataTypes.STRING,
    }, {},
  );
  Invites.associate = (models) => {
    Invites.belongsTo(models.Board, { foreignKey: 'board_id', onDelete: 'CASCADE' });
  };
  return Invites;
};
