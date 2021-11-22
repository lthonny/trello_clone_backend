const { expect } = require('chai');
const taskService = require('../app/services/taskService');

describe('Task service', function() {
  let taskId = null;
  beforeEach(async function() {});
  afterEach(async function() {});

  it('should create task', async function() {
    const data = {
      title: 'new task',
      description: 'new description',
      nameTaskList: 'Coded',
      board_id: 1,
      order: 1,
    };

    const { title, description, nameTaskList, board_id, order } = data;
    const newTask = await taskService.create(1, { title, description, nameTaskList, board_id, order });
    await taskService.create(2, { title, description, nameTaskList, board_id, order });
    taskId = newTask.dataValues.id;
    expect(title).to.equal(newTask.dataValues.title);
  });

  it('should get task', async function() {
    const task = await taskService.fetchOne(taskId);
    expect(task.dataValues.id).to.equal(taskId);
  });

  it('should update title task', async function() {
    const title = 'new title';
    const task = await taskService.updateTitle(taskId, title);
    expect(task.dataValues.title).to.equal(title);
  });

  it('should update description task', async function() {
    const description = 'new description';
    const task = await taskService.updateDescription(1, taskId, description);
    expect(task.dataValues.description).to.equal(description);
  });

  it('should remove task', async function() {
    const task = await taskService.delete(taskId);
    expect(task).to.equal('task deleted');
  });

  it('should archive task', async function() {
    const data = {
      id: 2,
      archive: true,
    };
    const task = await taskService.setArchive(data);
    expect(task.dataValues.archive).to.equal(false);
  });
});