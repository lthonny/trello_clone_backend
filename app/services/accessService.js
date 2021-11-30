const { user_board } = require('../models/index');

const authorizeAccess = async (id) => {
  const dbUserBoard = await user_board.findOne({
    where: {
      user_id: id,
      owner: true
    },
  });

  return dbUserBoard;
};

module.exports = authorizeAccess;