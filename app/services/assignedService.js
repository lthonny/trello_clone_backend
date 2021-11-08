const {user_tasks, user_board, User, Task, Board} = require('../models/index');

class AssignedService {

    async fetch(taskId, userId, boardId) {
        const usersBoard = await user_board.findAll({where: {board_id: boardId}});
        const usersTask = await user_tasks.findAll({where: {task_id: taskId}});

        // console.log(usersTask)

        let users_task = [];
        for (let i = 0; i < usersTask.length; i++) {
            const user = await User.findOne({where: {id: usersTask[i].dataValues.user_id}});
            users_task.push({id: user.id, name: user.name});
        }

        let users_board = [];
        for (let i = 0; i < usersBoard.length; i++) {
            const user = await User.findOne({where: {id: usersBoard[i].dataValues.user_id}});
            users_board.push({id: user.id, name: user.name});
        }

        return {allUsers: users_board, userAssigned: users_task};
    }

    async create(userId, taskId) {
        const user = await User.findOne({
            where: { id: userId }
        });
        const exists = await user_tasks.findOne({
            task_id: taskId,
            user_id: userId
        });

        if (exists) {
            return {exist: 'user has already been added'};
        } else {
            await user_tasks.create({
                task_id: taskId,
                user_id: userId
            });
            return {id: user.id, name: user.name};
        }

    }

    async remove(userId, taskId) {
        await user_tasks.destroy({
            where: {
                task_id: taskId,
                user_id: userId
            }
        });
        return {message: 'no assigned'};
    }
}

module.exports = new AssignedService();
