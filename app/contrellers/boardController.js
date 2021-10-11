const boardService = require('../services/boardService');

const lists = ['To Do', 'In Process', 'Coded', 'Testing', 'Done', 'Archive'];

class BoardController {

  async board(req, res, next) {
    try {
      const board = await boardService.fetchOne(req.params.id);
      return res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async boards(req, res, next) {
    try {
      const boards = await boardService.fetchAll(req.params.id);
      return res.status(200).send(boards);
    } catch (e) {
      next(e);
    }
  }

  async createBoard(req, res, next) {
    try {
      const board = await boardService.create(req.params.id, req.body.name);
      return res.status(200).send(board);
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const updated = await boardService.update(req.params.id, req.body.name);
      return res.status(200).send(updated);
    } catch (e) {
      next(e);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      await boardService.delete(req.params.id);
      return res.json('ok');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BoardController();
