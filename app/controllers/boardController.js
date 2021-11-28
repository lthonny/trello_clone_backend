const boardService = require('../services/boardService');

class BoardController {
    async board(req, res, next) {
        try {
            const {id} = req.params;
            const board = await boardService.getBoard(Number(id));
            return res.status(200).json(board);
        } catch (e) {
            next(e);
        }
    }

    async tasksBoard(req, res, next) {
        try {
            const {id} = req.params;
            const board = await boardService.fetchOne(Number(id));
            return res.status(200).json(board);
        } catch (e) {
            next(e);
        }
    }

    async boards(req, res, next) {
        try {
            const {id} = req.params;
            const boardTasks = await boardService.fetchAll(Number(id));
            return res.status(200).send(boardTasks);
        } catch (e) {
            next(e);
        }
    }

    async createBoard(req, res, next) {
        try {
            const {name} = req.body;
            const board = await boardService.create(req.params.id, name);
            return res.status(200).send(board);
        } catch (e) {
            next(e);
        }
    }

    async updateBoard(req, res, next) {
        try {
            const {title} = req.body;
            const board = await boardService.update(req.params.id, title, req.decoded.id);
            return res.status(200).send(board);
        } catch (e) {
            next(e);
        }
    }

    async deleteBoard(req, res, next) {
        try {
            await boardService.delete(req.params.id, req.decoded.id);
            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BoardController();
