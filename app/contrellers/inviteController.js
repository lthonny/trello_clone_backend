const inviteService = require('../services/inviteService');

class InviteController {
  async createInvite(req, res, next) {
    try {
      return res.status(200).json(
        await inviteService.create(req.params.id),
      );
    } catch (e) {
      next(e);
    }
  }

  async invite(req, res, next) {
    try {
      const { key } = req.params;
      return res.status(200).json(
        await inviteService.invite(key),
      );
    } catch (e) {
      next(e);
    }
  }

  async getBoard(req, res, next) {
    try {
      const { id, key } = req.body;
      return res.status(200).json(
        await inviteService.inviteBoard(id, key),
      );
    } catch (e) {
      next(e);
    }
  }

  async invitedUsers(req, res, next) {
    try {
      const { userId, name } = req.body;
      return res.status(200).json(
        await inviteService.users(userId, name, req.params),
      );
    } catch (e) {
      next(e);
    }
  }

  async owner(req, res, next) {
    try {
      const { data } = req.body;
      return res.status(200).json(
        await inviteService.owner(data),
      );
    } catch (e) {
      next(e);
    }
  }

  async removeInvited(req, res, next) {
    try {
      return res.status(200).json(
        await inviteService.remove(req.body),
      );
    } catch (e) {
      next(e);
    }
  }

  async leaveBoard(req, res, next) {
    try {
      return res.status(200).json(
        await inviteService.leave(req.body),
      );
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InviteController();