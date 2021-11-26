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

  async inviteBoard(userId, key) {
    const inviteKey = await Invites.findOne({ where: { key } });

    if (!inviteKey) {
      return 'Key not found';
    }

    const user = await User.findOne({ where: { id: userId } });
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
      user_id: userId,
    });
    return { userId, board: board.dataValues };
  }

  async users(userId, name, boardId) {
    const board = await user_board.findAll({ where: { board_id: boardId.id } });

    const names = [];
    const owner = [];
    for (let i = 0; i < board.length; i++) {
      let ids = board[i].user_id;

      const user = await User.findOne({ where: { id: ids } });
      if (user.name !== name) {
        names.push({
          id: user.id,
          name: user.name,
          owner: board[i].owner,
        });
      }
      if (board[i].dataValues.owner) {
        owner.push({
          id: board[i].user_id,
          name: user.name,
          owner: board[i].owner,
        });
      }
    }

    return { owner: owner, names: names };
  }

  async owner(data) {
    const User_board = await user_board.findOne({
      where: {
        user_id: data.userId,
        board_id: data.boardId,
      },
    });

    const board = await Board.findOne({ where: { id: data.boardId } });

    return {
      title: board.dataValues.title,
      userId: Number(data.userId),
      owner: User_board.owner,
    };
  }

  async leave(data) {
    const { user_id, board_id } = data.data;
    await user_board.destroy({
      where: {
        user_id,
        board_id,
        owner: false,
      },
    });
    return 'user left the board';
  }

  async remove(data) {
    await user_board.destroy({
      where: {
        user_id: data.data.user.id,
        board_id: data.data.board_id,
        owner: false,
      },
    });
    return 'user removed from board';
  }
}

module.exports = new InviteService();
