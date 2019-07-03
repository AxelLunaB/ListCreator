const assert = require('assert');
const app = require('../../src/app');

describe('\'clusters\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/clusters');

    assert.ok(service, 'Registered the service');
  });
});
