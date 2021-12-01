// const { sequelize } = require('/app/models/index');
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

    return [];
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

    if (!boards) {
      return [];
    }

    return boards;
  }

  async create(user_id, title) {
    const dbBoard = await Board.create({ title });
    const board = dbBoard.get({ plain: true });
    await user_board.create({ board_id: board.id, user_id, owner: true });
    return board;
  }

  async update(board_id, title, user_id, access) {
    if (access.owner) {
      await Board.update({ title }, { where: { id: board_id } });
      return { id: board_id, title, owner: true };
    }
    if (!access.owner) {
      return { id: board_id, title, owner: false };
    }
  }

  async delete(board_id, user_id, access) {
    if (access.owner) {

      // const t = await sequelize.transaction();
      // try {
      //   await Invites.destroy({ where: { board_id }, transaction: t });
      //   await Board.destroy({ where: { id: board_id}, transaction: t });
      //
      //   await t.commit();
      // } catch (e) {
      //   await t.rollback();
      // }

      await Invites.destroy({ where: { board_id } });
      await Board.destroy({ where: { id: board_id } });
    }
    if (!access.owner) {
      return await user_board.destroy({
        where: { board_id, user_id, owner: false },
      });
    }
  }

  async authorizeAccess(user_id, board_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id },
      attributes: ['owner'],
    });
    return dbUserBoard.get({ plain: true });
  };
}

module.exports = new BoardService();
