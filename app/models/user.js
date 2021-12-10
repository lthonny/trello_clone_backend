module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      auth_via: DataTypes.STRING,
    },
    {},
  );
  User.associate = (models) => {
    User.hasMany(models.RefreshToken, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.user_board, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.belongsToMany(models.Task, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      through: models.user_tasks,
    });
    User.belongsToMany(models.Board, {
      foreignKey: 'id',
      through: models.user_board,
      onDelete: 'CASCADE',
    });
  };
  return User;
};
