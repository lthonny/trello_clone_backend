const { v1 } = require('uuid');
const { Invites, user_board, User, Board } = require('../../models');

class InviteService {
  async create(board_id) {
    let inviteKey = await Invites.findOne({ where: { board_id } });
    if (!inviteKey) {
      inviteKey = await Invites.create({ board_id, key: v1() });
    }

    return { key: inviteKey.key };
  }

  async fetchBoard(user_id, key) {
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

  async fetchUsers(board_id, access) {
    if (access.owner) {
      const dbInvitedUsers = await user_board.findAll({
        where: { board_id, owner: false },
        attributes: ['owner'],
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
          },
        ],
      });

      const users = dbInvitedUsers.map((user) => {
        const { id, name } = user.dataValues.User;
        return { id, name, owner: user.dataValues.owner };
      });

      return users;
    }
    return [];
  }

  async owner(user_id, board_id) {
    const dbBoardUser = await Board.findOne({
      where: { id: board_id },
      attributes: ['title'],
      include:
        [
          {
            model: user_board,
            where: {
              user_id, board_id,
            },
            attributes: ['owner'],
          },
        ],
    });

    if (dbBoardUser) {
      const owner = dbBoardUser.user_boards[0].dataValues.owner;
      return { title: dbBoardUser.title, owner: owner };
    }

    return [];
  }

  async leave(user_id, board_id) {
    await user_board.destroy({
      where: { user_id, board_id, owner: false },
    });
    return null;
  }

  async remove(user_id, board_id) {
    await user_board.destroy({
      where: { user_id, board_id, owner: false },
    });
  }

  async authorizeAccess(user_id, board_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id },
      attributes: ['owner'],
    });
    if (dbUserBoard) {
      return dbUserBoard.get({ plain: true });
    }
    return null;
  };
}

module.exports = new InviteService();
