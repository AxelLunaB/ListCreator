const assert = require('assert');
const app = require('../../src/app');

describe('\'houseHistorics\' service', () => {
  it('registered the service', () => {
    const service = app.service('house-historics');

    assert.ok(service, 'Registered the service');
  });
});
