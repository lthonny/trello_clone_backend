const { sequelize, Board, user_board, Task, User, Invites } = require('../../models');
const { v1 } = require('uuid');

class BoardService {
  async fetchOne(board_id, user_id) {
    const access = await this.authorizeAccess(user_id, board_id);
    const dbBoard = await Board.findOne({ where: { id: board_id } });
    const dbTaskUsers = await Board.findByPk(board_id, {
      include: [
        {
          model: Task,
          where: { board_id },
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    const dbInvitedUsers = await user_board.findAll({
      where: { board_id, owner: false },
      attributes: ['owner'],
      include: [
        { model: User, attributes: ['id', 'name'] },
      ],
    });

    const users = dbInvitedUsers.map((user) => {
      const { id, name } = user.dataValues.User;
      return { id, name, owner: user.dataValues.owner };
    });

    if (dbTaskUsers) {
      const taskUsers = dbTaskUsers.Tasks.map(task => task.get({ plain: true }));
      return { board_id, title: dbBoard.dataValues.title, tasks: taskUsers, owner: access.owner, users };
    }

    return { board_id, tasks: [], title: dbBoard.dataValues.title, owner: access.owner };
  }

  async fetchAll(user_id) {
    const dbBoards = await Board.findAll({
      include: [{
        model: user_board,
        where: { user_id },
      }],
      attributes: ['id', 'title', 'createdAt', 'updatedAt'],
    });

    const boards = dbBoards.map(board => {
      const { id, title, createdAt, updatedAt } = board.get({ plain: true });
      return { id, title, createdAt, updatedAt };
    });

    return boards;
  }

  async create(user_id, title) {
    const dbBoard = await Board.create({ title });
    await user_board.create({ board_id: dbBoard.dataValues.id, user_id, owner: true });
    return dbBoard;
  }

  async update(board_id, title, user_id) {
    const access = await this.authorizeAccess(user_id, board_id);

    if (access.owner) {
      await Board.update({ title }, { where: { id: board_id } });
      return { title };
    }
    throw 403;
  }

  async delete(board_id, user_id) {
    const access = await this.authorizeAccess(user_id, board_id);

    if (access.owner) {
      await sequelize.transaction(async (transaction) => {
        await Invites.destroy({ where: { board_id }, transaction });
        await Board.destroy({ where: { id: board_id }, transaction });
      });
      return true;
    }
    return await user_board.destroy({ where: { board_id, owner: false } });
  }

  async removeAll(board_id, nameTaskList) {
    return await Task.destroy({ where: { board_id, nameTaskList } });
  }

  async deleteUserAccess(user_id, board_id, ownerId) {
    const access = await this.authorizeAccess(ownerId, board_id);
    if (access.owner) {
      await user_board.destroy({
        where: { user_id, board_id, owner: false },
      });
    }
    return {};
  }

  async leaveBoard(user_id, board_id) {
    await user_board.destroy({
      where: { user_id, board_id, owner: false },
    });
    return null;
  }

  async getInviteLink(board_id) {
    let inviteKey = await Invites.findOne({ where: { board_id } });
    if (!inviteKey) {
      inviteKey = await Invites.create({ board_id, key: v1() });
    }

    return inviteKey.key;
  }

  async getInviteBoard(user_id, key) {
    const dbInvite = await Invites.findOne({ where: { key } });

    if (!dbInvite) {
      return { message: 'key of undefined' };
    }

    const dbBoard = await Board.findOne({ where: { id: dbInvite.board_id } });
    const dbUserBoard = await user_board.findOne({ where: { board_id: dbBoard.id, user_id } });

    if (dbBoard) {
      if (dbUserBoard) {
        return { key: dbInvite, board: dbBoard.dataValues };
      } else {
        await user_board.create({
          board_id: dbInvite.board_id, owner: false, user_id,
        });

        return { key: dbInvite, board: dbBoard.dataValues };
      }
    }

    const board = await Board.findOne({ where: { id: dbInvite.board_id } });
    return { key: dbInvite, board: board.dataValues };
  }

  async getArchive(board_id) {
    const dbBoard = await Board.findByPk(board_id, {
      include: [{
        model: Task,
        where: { board_id, archive: true },
      }],
    });

    if (!dbBoard) {
      return [];
    }

    return dbBoard.Tasks.map(task => task.get({ plain: true }));
  }

  async createArchive(board_id, archive, task_id, user_id) {
    const access = await this.authorizeAccess(user_id, board_id);

    if (access.owner) {
      await Task.update({ archive: !archive }, {
        where: { id: task_id },
      });
      return await Task.findOne({ where: { id: task_id } });
    }
    throw new Error(403);
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
