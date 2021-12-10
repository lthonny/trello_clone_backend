const { expect } = require('chai');
const taskService = require('../app/services/task/taskService');

describe('Task service', function() {
  let userId = 999;
  let taskId = null;
  let boardId = 999;

  beforeEach(async function() {});
  afterEach(async function() {});

  it('should create task', async function() {
    const data = {
      title: 'new task',
      description: 'new description',
      nameTaskList: 'Coded',
      board_id: boardId,
      order: 1,
    };

    const newTask = await taskService.create(userId, data);
    taskId = newTask.id;

    expect(data.title).to.equal(newTask.title);
  });

  it('should update title task', async function() {
    const title = 'new title';
    const task = await taskService.updateTitle(taskId, title);
    expect(task.title).to.equal(title);
  });

  it('should update description task', async function() {
    const description = 'new description';
    const task = await taskService.updateDescription(userId, taskId, description);
    expect(task.description).to.equal(description);
  });

  it('should task column', async function() {
    const column = 'To Do';
    const task = await taskService.returnTaskColumn(taskId, column);
    expect(task.nameTaskList).to.equal(column);
  });

  it('should remove task', async function() {
    const task = await taskService.delete(taskId);
    expect(task).to.equal(1);
  });
});