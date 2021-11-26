const boardService = require('../services/boardService');

class BoardController {
  async tasksBoard(req, res, next) {
    try {
      const { id } = req.params;
      const board = await boardService.fetchOne(id);
      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  }

  async board(req, res, next) {
    try {
      return res.status(200).json(await boardService.getBoard(req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async boards(req, res, next) {
    try {
      return res.status(200).send(await boardService.fetchAll(req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async createBoard(req, res, next) {
    try {
      return res
        .status(200)
        .send(await boardService.create(req.params.id, req.body.name));
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const { title, idUser } = req.body;
      return res
        .status(200)
        .send(await boardService.update(req.params.id, title, idUser));
    } catch (e) {
      next(e);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      await boardService.delete(req.body.user_id, req.params.id);
      return res.status(200).json('ok');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BoardController();
