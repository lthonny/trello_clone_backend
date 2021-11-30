const { Board, Task } = require('../models/index');

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

    if (dbBoard) {
      return dbBoard.Tasks.map(task => task.get({ plain: true }));
    }
    return null;
  }

  async setArchive(id, archive) {
    await Task.update({ archive: !archive }, {
      where: { id },
    });

    const archiveTask = await Task.findOne({ where: { id } });

    return archiveTask;
  }
}

module.exports = new ArchiveService();