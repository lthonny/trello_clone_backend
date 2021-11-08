module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    task_id: DataTypes.NUMBER,
    column: DataTypes.STRING,
    name_user: DataTypes.STRING,
    board_id: DataTypes.NUMBER,
    transaction: DataTypes.STRING
  }, {});
  Transaction.associate = (models) => {
    Transaction.belongsToMany(models.User, {
      through: models.user_tasks,
      foreignKey: 'task_id',
      onDelete: 'CASCADE'
    })
    Transaction.belongsTo(models.Board, {
      foreignKey: 'board_id',
      onDelete: 'CASCADE'
    });
  };
  return Transaction;
}


