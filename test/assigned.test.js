const { expect } = require('chai');
const assignedService = require('../app/services/assignedService');

describe('Assigned service', function() {
  beforeEach(async function() {});
  afterEach(async function() {});

  it('should create assigned', async function() {
    const data = { userId: 1, taskId: 1, boardId: 1 };

    const assigned = await assignedService.create(data);
    expect(assigned.exist).to.equal('user has already been added');
  });
});