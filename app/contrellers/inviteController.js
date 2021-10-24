const inviteService = require('../services/inviteService');

class InviteController {
    async createInvite(req, res, next) {
        try {
            const inviteKey = await inviteService.create(Number(req.params.id));
            return res.json(inviteKey);
        } catch (e) {
            next(e);
        }
    }

    async invite(req, res, next) {
        try {
            const { key } = req.params;
            const invite = await inviteService.invite(key);
            return res.json(invite);
        } catch (e) {
            next(e);
        }
    }

    async getBoard(req, res, next) {
        try {
            const { id, key } = req.body;
            const board = await inviteService.inviteBoard(id, key);
            return res.json(board);
        } catch (e) {
            next(e);
        }
    }

    async invitedUsers(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const users = await inviteService.users(id, name);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new InviteController();