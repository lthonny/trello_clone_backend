const { Board, Task, user_board } = require('../models');

class ArchiveService {
  async getArchive(id) {
    const dbBoard = await Board.findByPk(id, {
      include: [{
        model: Task,
        where: {
          board_id: id,
          archive: true,
        },
      }],
    });

    if (!dbBoard) {
      return [];
    }

    return dbBoard.Tasks.map(task => task.get({ plain: true }));
  }

  async setArchive(id, archive, access) {
    if(access.owner) {
      await Task.update({ archive: !archive }, {
        where: { id },
      });
      return await Task.findOne({ where: { id } });
    }
    return [];
  }

  async authorizeAccess(user_id, board_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id },
      attributes: ['owner'],
    });
    return dbUserBoard.get({ plain: true });
  };
}

module.exports = new ArchiveService();