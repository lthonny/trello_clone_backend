module.exports = (sequelize, DataTypes) => {
  const Tasklist = sequelize.define('tasklist', {
    name: DataTypes.STRING
  }, {});
  Tasklist.associate = (models) => {};
  return Tasklist;
};