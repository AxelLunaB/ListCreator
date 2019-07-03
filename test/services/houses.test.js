const assert = require('assert');
const app = require('../../src/app');

describe('\'houses\' service', () => {
  it('registered the service', () => {
    const service = app.service('houses');

    assert.ok(service, 'Registered the service');
  });
});
