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
    User.hasMany(models.user_board, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    User.belongsToMany(models.Task, {
      through: models.user_tasks,
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
