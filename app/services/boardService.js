const { Board, user_board, Task, User, Invites, user_tasks } = require('../models/index');
const { Op, where } = require('sequelize');

class Boards {
  id;
  title;
  createdAt;
  updatedAt;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

class BoardService {
  async fetchOne(id) {
    let board = await Board.findByPk(id, {
      include: [
        {
          model: Task,
          where: {
            board_id: id,
          },
        },
      ],
    });
    let tasks = board.Tasks.map((task) => task.dataValues);
    // console.log('tasks', tasks);

    if (board === null) {
      return { error: 'в таблице нет задач' };
    }

    // const activeTasks = (await user_tasks.findAll({ where: { board_id: id } })).map(data => {
    //   if (data.active) {
    //     if (data.board_id === Number(id)) {
    //       return data.dataValues;
    //     }
    //   }
    // }).filter((task) => task);
    // console.log('activeTasks', activeTasks);

    // let idx = activeTasks.map((task, i) => {
    //   return { task_id: task.task_id, user_id: task.user_id };
    // });
    // // console.log(idx);
    // const joinTasks = [];
    //
    // for (let i = 0; i < idx.length; i++) {
    //   const task = await Task.findOne({ where: { id: idx[i].task_id } });
    //   // console.log('task', task.dataValues);
    //
    //   const userModal = await User.findOne({ where: { id: idx[i].user_id } });
    //   // console.log(userModal.dataValues);
    //
    //   if (userModal.dataValues) {
    //     const user = {
    //       id: userModal.dataValues.id,
    //       name: userModal.dataValues.name,
    //       email: userModal.dataValues.email,
    //     };
    //     if (task) {
    //       joinTasks.push({
    //         id: task.id,
    //         title: task.title,
    //         description: task.description,
    //         nameTaskList: task.nameTaskList,
    //         board_id: task.board_id,
    //         order: task.order,
    //         active: [user],
    //       });
    //     }
    //   }
    // }

    // console.log('joinTasks', joinTasks);
    // // console.log('ind', ind);
    /*
    *
    *
    *
    * */
    // board.Tasks = board.Tasks.map((task, i) => {
    //   if(activeTasks[i]) {
    //     if(task.dataValues.id !== joinTasks.task_id) {
    //       return joinTasks[i];
    //     }
    //     // else {
    //     //   console.log('else');
    //     // }
    // //
    // //     // console.log('task.dataValues', task.dataValues);
    // //     // console.log('activeTasks[i].task_id', activeTasks[i].task_id);
    // //     // if(task.dataValues === activeTasks[i].task_id) {
    // //       // console.log('task.dataValues', activeTasks[i]);
    // //       // return activeTasks[i];
    // //     // }
    // //     // console.log(task.dataValues !== idx[i].task_id);
    // //
    // //     // return task.dataValues !== idx[i].task_id
    //   }
    //   else {
    //     // console.log('else');
    //     // activeTasks.forEach((data, i) => {
    //     //   // if(data) {
    //     //   //   console.log(data.id);
    //     //   // }
    //     //   console.log(data.task_id);
    //     //   // if(data.dataValues.id !== !task.dataValues.id) {
    //     //   //   return task.dataValues.id
    //     //   // }
    //     // })
    //     // if(!task.dataValues.active) {
    //     //   console.log('activeTasks', activeTasks);
    //     //   // console.log(task.dataValues);
    //     //   return task.dataValues.id
    //     // }
    // //     // console.log('task.dataValues', task.dataValues);
    //     return task.dataValues;
    //   }
    // });
    /*
    *
    *
    *
    * */
    //
    // const index = this.taskListToDo.findIndex((task: any) => task.id === result.item.id);
    // if (index !== -1) {
    //   this.taskListToDo.splice(index, 1);
    // }

      // board.Tasks = board.Tasks.filter((task, i) => {
      //   if(joinTasks) {
      //     console.log('joinTasks.id', joinTasks[i].id);
      //   }
      //   console.log(task.dataValues.id);
      // })

      // return task.dataValues !== idx.task_id
    //   if (ind[i]) {
    //     console.log('task.dataValues.id === ind', task);
    //
    //
    //     if (task.dataValues.id === ind) {
    //       // return 'gg';
    //       //  console.log('task.dataValues', task.dataValues);
    //     }
    //   } else {
    //     return task.dataValues;
    //   }
    // // const array3 = joinTasks.concat(board.Tasks);
    //
    // console.log('board.Tasks', board.Tasks);
    //
    // // board.Tasks = board.Tasks.map((task) => {
    // // if(task) {
    // //
    // // }
    // // })
    //
    // // console.log('array3', array3);
    //
    // let allTasks = [];
    // board.Tasks.forEach((task, i) => {
    //   // console.log(task.dataValues);
    //   if (joinTasks[i]) {
    //     if (joinTasks[i].active) {
    //       allTasks.push(joinTasks[i]);
    //     }
    //     // else {
    //     //   allTasks.push(task);
    //   }
    //   // if(task.id !== joinTasks.id) {
    //   //   allTasks.push(task);
    //   // }
    //   // if(task.id !== joinTasks[i].id) {
    //   //   allTasks.push(task);
    //   // }
    //   // console.log('joinTasks[i]', joinTasks[i]);
    //   // }
    //   // else {
    //   //   if(task) {
    //   //     console.log('task', task.id);
    //   //     // if(joinTasks[i].id !== task.id) {
    //   //     //   allTasks.push(task);
    //   //     // }
    //   //   }
    //   // }
    //   // allTasks.push(task)
    // });
    //
    // // const dd = [];
    // // board.Tasks.map((task, i) => {
    // //   if (task) {
    // //
    // //     if (allTasks[i]) {
    // //
    // //       if (allTasks[i].id !== task.id) {
    // //         allTasks.push(joinTasks[i]);
    // //       }
    // //
    // //       // if(task[i]) {
    // //       //   console.log(joinTasks[i].id);
    // //       //   console.log(task[i].id);
    // //       // }
    // //
    // //       // if(allTasks[i].id !== joinTasks[i].id) {
    // //       //   dd.push(allTasks[i]);
    // //       // }
    // //       // console.log('allTasks', allTasks[i]);
    // //     }
    // //   }
    // // task.id !== board.Tasks[i].id
    // // if(task.id !== allTasks[i].id) {
    // //   allTasks.push(task);
    // // }
    // // return;
    // // });
    //
    // // console.log('dd', dd);
    // let newArr = [];
    // board.Tasks = board.Tasks.map((task, i) => {
    //   if (activeTasks[i]) {
    //     if (task.dataValues.id !== activeTasks[i].id) {
    //       console.log('task', activeTasks);
    //       newArr.push(activeTasks[i].dataValues);
    //     } else {
    //       newArr.push(task);
    //     }
    //   } else {
    //     newArr.push(task);
    //   }
    // })
    // //
    // //   if (joinTasks[i]) {
    // //     if (!task.active) {
    // //       // console.log(joinTasks[i]);
    // //       // newArr = newArr.filter((data) => data.active !== task[i].active)
    // //       // newArr.push(joinTasks[i]);
    // //       // if(newArr[i].id !== task.id) {
    // //       //   newArr.push(joinTasks[i]);
    // //       // }
    // //     } else {
    // //       // if(task.id !== joinTasks[i].id) {
    // //       //   newArr.push(task.dataValues);
    // //       // }
    // //     }
    // //   }
    // //   else {
    // //       newArr.push(task.dataValues);
    //   }
    // });
    //
    // console.log('task', newArr);

    return {
      id: id,
      title: board.dataValues.title,
      'tasks': board.Tasks,
      // activeTasks: joinTasks
    };
  }

  async fetchAll(id) {
    const getBoards = await Board.findAll({
      include: {
        model: user_board,
        where: {
          user_id: id,
        },
      },
    });

    const boards = getBoards.map(({ id, title, createdAt, updatedAt }) => {
      return new Boards({ id, title, createdAt, updatedAt });
    });

    return boards;
  }

  async getBoard(id) {
    const board = await Board.findOne({ where: { id } });
    return board;
  }

  async create(id, name) {
    const board = await Board.create({ title: name });
    const userBoard = await user_board.create({ board_id: board.id, user_id: id, owner: true });

    return board;
  }

  async update(id, title, idUser) {
    const user = await User.findOne({ where: { id: idUser } });
    const board = await user_board.findOne({ where: { user_id: user.id } });
    // console.log(board.owner);

    if (board.owner) {
      // console.log('false');
      await Board.update({ title }, { where: { id } });
      return { id: id, title: title, owner: true };
    } else {
      const board = await Board.findOne({ where: { id } });
      if (board.title !== title) {
        // console.log('true');
        return { id: id, title: title, owner: false };
      }
    }
  }

  async delete(id) {
    const board = await Invites.findOne({ where: { board_id: id } });

    if (board) {
      await Invites.destroy({ where: { board_id: id } });
    }

    return await Board.destroy({ where: { id } });
  }
}

module.exports = new BoardService();