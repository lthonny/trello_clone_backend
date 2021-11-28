module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      refreshToken: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {},
  );
  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };
  return RefreshToken;
};
