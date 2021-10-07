const { Board, user_board } = require('../models/index');

class BoardController {
  async board(req, res, next) {
    try {
      const { id } = req.params;
      const board = await Board.findOne({ where: { id } });

      return res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async boards(req, res, next) {
    try {
      const { id } = req.params;
      const boards = await Board.findAll({include: {model: user_board, where: { user_id: 1 }}});
      return res.json(boards);
    } catch (e) {
      next(e);
    }
  }

  async createBoard(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const board = (await Board.create({ title: name })).get();
      const userBoard = await user_board.create({board_id: board.id, user_id: id});

      return res.status(200).send({ message: 'The table is created' });
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const board = await Board.update({title: name}, {where: { id }});
      const updated = await Board.findOne({ where: { id } });

      return res.json(updated);
    } catch(e) {
      next(e);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const { id } = req.params;
      await Board.destroy({where: {id}});
      return res.json('ok');
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new BoardController();
