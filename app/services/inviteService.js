const { v1 } = require('uuid');
const { Invites, user_board, User, Board } = require('../models/index');

class InviteService {
  async create(id) {
    let inviteKey = await Invites.findOne({ where: { id } });
    if (!inviteKey) {
      inviteKey = await Invites.create({ board_id: id, key: v1() });
    }

    return { key: inviteKey.key };
  }

  async inviteBoard(user_id, key) {
    const inviteKey = await Invites.findOne({ where: { key } });

    if (!inviteKey) {
      return 'Key not found';
    }

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return 'User not found';
    }

    const board = await Board.findByPk(inviteKey.board_id);
    if (!board) {
      return 'Board not found';
    }

    await user_board.create({
      board_id: board.id,
      owner: false,
      user_id: user_id,
    });

    return board.dataValues;
  }

  async users(board_id) {
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

    if(dbInvitedUsers) {
      const users = dbInvitedUsers.map((user) => {
        const { id, name } = user.dataValues.User;
        return { id, name, owner: user.dataValues.owner}
      });

      return users;
    }

    return null;
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

    return null;
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
    return null;
  }
}

module.exports = new InviteService();
