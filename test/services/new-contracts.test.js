const assert = require('assert');
const app = require('../../src/app');

describe('\'newContracts\' service', () => {
  it('registered the service', () => {
    const service = app.service('new-contracts');

    assert.ok(service, 'Registered the service');
  });
});
