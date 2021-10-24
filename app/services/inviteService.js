const { v1 } = require('uuid');
const {Invites, user_board, User, Board} = require('../models/index');
const {where} = require("sequelize");

class InviteService {
    async create(id) {
        let inviteKey = await Invites.findOne({ where: {id}});

        if(!inviteKey) {
            inviteKey = await Invites.create({ board_id: id, key: v1() });
        }

        return { key: inviteKey.key };
    }

    async invite(key) {
        const inviteKey = await Invites.findOne({where: {key}});

        const owner = await user_board.findOne({ where: {
            board_id: inviteKey.board_id, owner: true
        }});

        return owner;
    }

    async inviteBoard(id, key) {
        const inviteKey = await Invites.findOne({ where: {key}});

        if (!inviteKey) {
            console.log('Key not found');
        }

        const user = await User.findByPk(id);
        // console.log(user);

        if (!user) {
            console.log('User not found');
        }

        const board = await Board.findByPk(inviteKey.board_id);
        // console.log(board);
        if (!board) {
            console.log('Board not found');
        }

        await user_board.update({owner: false},{where: {id}});
        await user_board.findOne({ where: { user_id: id, owner: false}});

        return board;
    }
}

module.exports = new InviteService();