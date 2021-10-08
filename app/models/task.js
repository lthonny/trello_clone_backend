module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Task.associate = (models) => {
    Task.hasMany(models.user_tasks, {
      foreignKey: 'task_id',
    });
  };
  return Task;
};
