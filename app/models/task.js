module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    nameTaskList: DataTypes.STRING,
    board_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    archive: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
  }, {});
  Task.associate = (models) => {
    // Task.hasMany(models.user_tasks, {
    //   foreignKey: 'task_id',
    //   onDelete: 'CASCADE'
    // });

    Task.belongsTo(models.Board, {
      foreignKey: 'board_id',
      onDelete: 'CASCADE'
    });

    Task.belongsToMany(models.User, {
      through: models.user_tasks,
      foreignKey: 'task_id',
      onDelete: 'CASCADE'
    })
  };
  return Task;
};
