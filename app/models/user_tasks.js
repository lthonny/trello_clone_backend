module.exports = (sequelize, DataTypes) => {
  const user_tasks = sequelize.define(
    'user_tasks',
    {
      task_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      active: {
        type: DataTypes.BOOLEAN,
      },
      board_id: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  user_tasks.associate = (models) => {
    user_tasks.belongsTo(models.User, { foreignKey: 'id', onDelete: 'CASCADE' });
    user_tasks.belongsTo(models.Task, { foreignKey: 'id', onDelete: 'CASCADE' });
  };
  return user_tasks;
};
