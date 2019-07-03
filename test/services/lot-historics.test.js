const assert = require('assert');
const app = require('../../src/app');

describe('\'lotHistorics\' service', () => {
  it('registered the service', () => {
    const service = app.service('lot-historics');

    assert.ok(service, 'Registered the service');
  });
});
