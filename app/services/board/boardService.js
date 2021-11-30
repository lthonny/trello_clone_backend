const { Board, user_board, Task, User, Invites } = require('../../models');

class BoardService {
  async fetchOne(id) {
    const dbBoard = await Board.findOne({ where: { id } });

    const dbTaskUsers = await Board.findByPk(id, {
      include: [
        {
          model: Task,
          where: {
            board_id: id,
          },
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (dbTaskUsers) {
      const taskUsers = dbTaskUsers.Tasks.map(task => task.get({ plain: true }));
      return { id, title: dbBoard.dataValues.title, tasks: taskUsers };
    }

    return null;
  }

  async fetchAll(id) {
    const dbBoards = await Board.findAll({
      include: [{
        model: user_board,
        where: {
          user_id: id,
        },
      }],
      attributes: ['id', 'title', 'createdAt', 'updatedAt'],
    });

    const boards = dbBoards.map(board => {
      const { id, title, createdAt, updatedAt } = board.get({ plain: true });
      return { id, title, createdAt, updatedAt };
    });

    if (boards) {
      return boards;
    }

    return null;
  }

  async create(id, name) {
    const dbBoard = await Board.create({ title: name });
    const board = dbBoard.get({ plain: true });

    if (board) {
      await user_board.create({ board_id: board.id, user_id: id, owner: true });
      return board;
    }

    return null;
  }

  async update(id, title, user_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id: id },
      attributes: ['owner'],
    });

    const owner = dbUserBoard.get({ plain: true });

    if (owner.owner) {
      await Board.update({ title }, { where: { id } });
      return { id, title, owner: true };
    }
    if (!owner.owner) {
      const board = await Board.findOne({ where: { id } });
      if (board.title !== title) {
        return { id, title, owner: false };
      }
    }
  }

  async delete(id, user_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id: id },
      attributes: ['owner'],
    });

    const owner = dbUserBoard.get({ plain: true });

    if (owner.owner) {
      await Invites.destroy({ where: { board_id: id } });
      await Board.destroy({ where: { id } });
    }
    if (!owner.owner) {
      await user_board.destroy({
        where: { board_id: id, user_id, owner: false },
      });
    }
  }
}

module.exports = new BoardService();
