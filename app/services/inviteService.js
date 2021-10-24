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

  async invite(key) {
    const inviteKey = await Invites.findOne({ where: { key } });

    const owner = await user_board.findOne({
      where: {
        board_id: inviteKey.board_id, owner: true,
      },
    });

    console.log('owner', owner);

    return owner;
  }

  async inviteBoard(userId, key) {
    const inviteKey = await Invites.findOne({ where: { key } });

    if (!inviteKey) {
      console.log('Key not found');
    }

    const user = await User.findByPk(userId);
    console.log(user);

    if (!user) {
      console.log('User not found');
    }

    const board = await Board.findByPk(inviteKey.board_id);
    // console.log(board);
    if (!board) {
      console.log('Board not found');
    }

    // await user_board.create({owner: false,},{where: {user_id: userId}});
    // await user_board.findOne({
    //     where: { user_id: userId, owner: false}
    // });

    // await user_board

    await user_board.create({ board_id: board.id, owner: false, user_id: userId });
    return board;
  }

  async users(board_id, name) {
    const users_board = await user_board.findAll({ where: { board_id } });
    const usersId = users_board.map((user) => user.dataValues.user_id);

    let users = [];
    for (let i = 0; i < usersId.length; i++) {
      const user = await User.findOne({ where: { id: usersId[i] } });
      const userName = user.dataValues.name;
      console.log('userName', userName);

      if(userName !== name && userName ) {
        users.push({ name: userName });
      }
    }

    // if () {
    //
    // } else {
    //
    // }

    return users;
  }
}

module.exports = new InviteService();