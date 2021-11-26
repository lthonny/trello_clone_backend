module.exports = (sequelize, DataTypes) => {
  const Invites = sequelize.define(
    'Invites',
    {
      board_id: DataTypes.INTEGER,
      key: DataTypes.STRING,
    },
    {},
  );
  Invites.associate = (models) => {
    Invites.hasOne(models.Board, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Invites;
};
