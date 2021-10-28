'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_tasks', 'assigned', {
      type: Sequelize.BOOLEAN
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_tasks', 'assigned');
  }
}