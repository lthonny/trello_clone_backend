const {user_tasks, user_board, User, Task, Board} = require('../models/index');

class AssignedService {

    async fetch(taskId, userId, boardId) {
        const usersBoard = await user_board.findAll({where: {board_id: boardId}});
        const owner = await User.findOne({
            include: { model: user_board, where: { user_id: userId }},
        });
        //
        // // const usersTasks = await User.findAll({
        // //     include: { model: user_tasks, where: { task_id: taskId }},
        // // });
        //
        // console.log(usersTasks)

        let users = [];
        for (
            let i = 0; i < usersBoard.length; i++
        ) {
            const user = await User.findOne({where: {id: usersBoard[i].dataValues.user_id}});
            if(owner.id !== user.id) {
                users.push({id: user.id, name: user.name});
            }
        }

        const usersTasks = await user_tasks.findAll({where: {task_id: taskId}});
        let usersAssigned = [];
        for (let i = 0; i < usersTasks.length; i++) {
            if(usersTasks[i].user_id !== owner.id) {
                if(usersTasks[i].dataValues.user_id === users[i].id) {
                    // console.log(usersTasks[i].dataValues.user_id);
                    usersAssigned.push({
                        id: usersTasks[i].dataValues.user_id,
                        name: users[i].name,
                        assigned: usersTasks[i].dataValues.assigned
                    });
                } else {
                    // usersTasks[i].dataValues.user_id
                    console.log(usersTasks[i].dataValues.user_id);
                    // return 'gg';
                }
                // console.log(usersTasks[i].dataValues.user_id)
            } else {
                console.log('else');
            }
        }

        console.log('usersAssigned', usersAssigned);
        console.log('users', users);

        // const usersBoard = await user_board.findAll({where: {board_id: boardId}});
        // const adminModal = await user_board.findOne({where: {owner: false}});
        // const admin = await User.findOne({where: {id: adminModal.user_id}});
        // const ownerModel = await user_board.findOne({where: {board_id: boardId, owner: true}});
        // const owner = await User.findOne({where: {id: ownerModel.user_id}});
        // console.log('owner', owner);
        //
        // let users = [];
        // for (
        //     let i = 0; i < usersBoard.length; i++
        // ) {
        //     const user = await User.findOne({where: {id: usersBoard[i].dataValues.user_id}});
        //     if(owner.id !== user.id) {
        //         users.push({id: user.id, name: user.name});
        //     }
        // }
        //
        // const usersTasks = await user_tasks.findAll({where: {task_id: taskId}});
        // let qqz = [];
        // for (let i = 0; i < usersTasks.length; i++) {
        //     qqz.push({
        //         id: usersTasks[i].dataValues.user_id,
        //         name: users[i].name,
        //         assigned: usersTasks[i].dataValues.assigned
        //     });
        // }
        // console.log('qqz', qqz);
        //
        // let usersAssigned = [];
        // for (let i = 0; i < qqz.length; i++) {
        //     usersAssigned.push({id: users[i].id, name: users[i].name, assigned: qqz[i].assigned});
        // }
        //
        // console.log('userss', usersAssigned);
        // console.log('all users ', users);
        // console.log({users, usersAssigned});
        return {users, usersAssigned};
    }

    async create(userId, taskId) {
        // const userFindOne = await User.findOne({where: {id: userId, assigned: true}});
        //
        // const getUser = await User.findOne({
        //     include: {
        //         model: user_tasks,
        //         where: {
        //             user_id: userId
        //         },
        //     },
        // });
        // console.log('getUser', getUser)

        const modelUserTasks = await user_tasks.create({
            user_id: userId,
            task_id: taskId,
            assigned: true,
        });

        const user = await User.findOne({ where: {id: userId} });

        if(user) {
            return {
                id: user.id,
                name: user.name,
                assigned: modelUserTasks.assigned,
            };
        }

        return {
            id: user.id,
            name: user.name,
            assigned: modelUserTasks.assigned,
        };
    }

    async update(userId, taskId, assigned) {
        const modelUserTasks = await user_tasks.update({assigned: !assigned}, {
            where: { task_id: taskId, user_id: userId },
        });

        console.log('modelUserTasks', modelUserTasks);

        const user = await User.findOne({where: {id: userId}});
        const userTasks = await user_tasks.findOne({where: {user_id: userId}});
        console.log(userTasks);
        // console.log(user.id, user.name, userTasks.assigned, userTasks.user_id);
        return { id: user.id, name: user.name, assigned: userTasks.assigned};
    }

    async remove(userId, taskId, assigned) {

        const modelUserTasks = await user_tasks.findOne({
            user_id: userId,
            task_id: taskId,
            assigned: assigned
        });

        console.log(modelUserTasks);

        // return await user_tasks.update({where: {user_id: userId}});
        return {message: 'no assigned'}
    }
}

module.exports = new AssignedService();
