const { expect } = require('chai');
const assignedService = require('../app/services/assignedService');

describe('Assigned service', function() {
  beforeEach(async function() {});
  afterEach(async function() {});

  xit('should create assigned', async function() {
    const data = { userId: 1, taskId: 3, boardId: 2 };

    const assigned = await assignedService.create(data);
    expect(assigned.exist).to.equal('user has already been added');
  });
});