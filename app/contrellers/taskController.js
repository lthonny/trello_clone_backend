const { Task } = require('../models/index');

class TaskController {
    async task(req, res, next) {
        try {
            const { id } = req.params;
            
            const task = await Task.findOne({ where: { id } });

            return res.json(task);
        } catch (e) {
            next(e);
        }
    }

    async tasks(req, res, next) {
        try {
            return res.json(await Task.findAll());
        } catch (e) {
            next(e);
        }
    }

    async createTask(req, res, next) {
        try {
            const { title, description } = req.body;
            const task = (await Task.create({ title, description })).get();

            return res.status(200).send({ message: 'The task is created' });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TaskController();