const { user_board } = require('../../models');

const authorizeAccess = async (user_id) => {
  const dbUserBoard = await user_board.findOne({
    where: { user_id, owner: true },
  });

  return dbUserBoard;
};

module.exports = authorizeAccess;