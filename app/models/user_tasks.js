module.exports = (sequelize, DataTypes) => {
  const user_tasks = sequelize.define('user_tasks', {
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN
    },
    board_id: {
      type: DataTypes.INTEGER
    },
  }, {});
  user_tasks.associate = (models) => {};
  return user_tasks;
};
