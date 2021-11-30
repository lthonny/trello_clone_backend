const boardService = require('../services/boardService');
const accessService = require('../services/utils/accessService');

class BoardController {
  async tasksBoard(req, res, next) {
    try {
      const { id } = req.params;
      const board = await boardService.fetchOne(Number(id));

      if(!board) {
        return res.status(204);
      }

      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  }

  async boards(req, res, next) {
    try {
      const boardTasks = await boardService.fetchAll(Number(req.decoded.id));

      if(!boardTasks) {
        return res.sendStatus(204);
      }

      return res.status(200).send(boardTasks);
    } catch (e) {
      next(e);
    }
  }

  async createBoard(req, res, next) {
    try {
      const { name } = req.body;

      const board = await boardService.create(Number(req.decoded.id), name);

      if(!board) {
        return res.sendStatus(204);
      }

      return res.status(200).send(board);
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const { title } = req.body;

      const access = await accessService(req.decoded.id);

      // if (!access) {
      //   return res.sendStatus(204);
      // }

      const board = await boardService.update(req.params.id, title, req.decoded.id);
      return res.status(200).send(board);
    } catch (e) {
      next(e);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      await boardService.delete(req.params.id, Number(req.decoded.id));
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BoardController();
