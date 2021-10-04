module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Task.associate = (models) => {};
  return Task;
};