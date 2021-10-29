const {v1} = require('uuid');
const {Invites, user_board, User, Board} = require('../models/index');

class InviteService {
    async create(id) {
        let inviteKey = await Invites.findOne({where: {id}});

        if (!inviteKey) {
            inviteKey = await Invites.create({board_id: id, key: v1()});
        }

        return {key: inviteKey.key};
    }

    async invite(key) {
        const inviteKey = await Invites.findOne({where: {key}});

        const owner = await user_board.findOne({
            where: {
                board_id: inviteKey.board_id, owner: true,
            },
        });

        console.log('owner', owner);

        return owner;
    }

    async inviteBoard(userId, key) {
        const inviteKey = await Invites.findOne({where: {key}});
        if (!inviteKey) {
            return 'Key not found';
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return 'User not found';
        }

        const board = await Board.findByPk(inviteKey.board_id);
        if (!board) {
            return 'Board not found';
        }

        await user_board.create({board_id: board.id, owner: false, user_id: userId});
        return board;
    }

    async users(userId, name, boardId) {
        const board = await user_board.findAll({where: {board_id: boardId.id}});

        const names = [];
        const owner = [];
        for (let i = 0; i < board.length; i++) {
            let ids = board[i].user_id;

            const user = await User.findOne({where: {id: ids}});
            if(user.name !== name) {
                names.push({
                    id: user.id,
                    name: user.name,
                    owner: board[i].owner
                })
            }
            if(board[i].dataValues.owner) {
                owner.push({
                    id: board[i].user_id,
                    name: user.name,
                    owner: board[i].owner
                })
            }
        }

        return {owner: owner, names: names};
    }

    async owner(data) {
        const board = await user_board.findOne({ where: {
            user_id: data.userId, board_id: data.boardId
        }});
        return {
            userId: Number(data.userId),
            owner: board.owner
        };
    }
}

module.exports = new InviteService();