module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HistoryActions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      column: {
        type: Sequelize.STRING,
      },
      name_user: {
        type: Sequelize.STRING,
      },
      board_id: {
        type: Sequelize.INTEGER,
      },
      transaction: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HistoryActions');
  },
};
