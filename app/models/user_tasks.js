module.exports = (sequelize, DataTypes) => {
  const user_tasks = sequelize.define('user_tasks', {
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  user_tasks.associate = (models) => {
    user_tasks.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
    user_tasks.belongsTo(models.Task, {
      as: 'task',
      foreignKey: 'task_id',
    });
  };
  return user_tasks;
};