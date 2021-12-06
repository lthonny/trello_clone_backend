module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task', {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      nameTaskList: DataTypes.STRING,
      board_id: DataTypes.INTEGER,
      order: DataTypes.DOUBLE,
      archive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {},
  );
  Task.associate = (models) => {
    Task.belongsTo(models.Board, { foreignKey: 'board_id', onDelete: 'CASCADE' });
    Task.belongsToMany(models.User, { foreignKey: 'task_id', onDelete: 'CASCADE', through: models.user_tasks });
    Task.hasMany(models.HistoryAction, { foreignKey: 'task_id', onDelete: 'CASCADE' });
  };
  return Task;
};
