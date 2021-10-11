module.exports = (sequelize, DataTypes) => {
  const user_tasks = sequelize.define('user_tasks', {
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  user_tasks.associate = (models) => {
    user_tasks.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    user_tasks.belongsTo(models.Task, {
      foreignKey: 'task_id',
      onDelete: 'CASCADE'
    });
  };
  return user_tasks;
};
