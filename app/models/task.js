module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task', {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      nameTaskList: DataTypes.STRING,
      board_id: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
      archive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {},
  );
  Task.associate = (models) => {
    // Task.hasMany(models.user_tasks, { foreignKey: 'id', onDelete: 'CASCADE' });

    Task.belongsTo(models.Board, { foreignKey: 'board_id', onDelete: 'CASCADE' });
    Task.hasMany(models.user_tasks, { foreignKey: 'task_id', onDelete: 'CASCADE' });
    Task.hasMany(models.Transaction, { foreignKey: 'task_id', onDelete: 'CASCADE' });


    // Task.belongsToMany(models.User, {
    //   foreignKey: 'id',
    //   through: models.user_tasks,
    //   onDelete: 'CASCADE'
    // });
  };
  return Task;
};
