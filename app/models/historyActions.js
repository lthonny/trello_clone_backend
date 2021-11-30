module.exports = (sequelize, DataTypes) => {
  const HistoryAction = sequelize.define(
    'HistoryAction', {
      task_id: DataTypes.NUMBER,
      column: DataTypes.STRING,
      name_user: DataTypes.STRING,
      board_id: DataTypes.NUMBER,
      transaction: DataTypes.STRING,
    }, {},
  );
  HistoryAction.associate = (models) => {
    HistoryAction.belongsTo(models.Task, { foreignKey: 'id', onDelete: 'CASCADE' });
  };
  return HistoryAction;
};
