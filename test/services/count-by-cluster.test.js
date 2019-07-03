const assert = require('assert');
const app = require('../../src/app');

describe('\'countByCluster\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/countByCluster');

    assert.ok(service, 'Registered the service');
  });
});
