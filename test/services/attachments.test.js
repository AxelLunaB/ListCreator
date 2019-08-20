const assert = require('assert');
const app = require('../../src/app');

describe('\'attachments\' service', () => {
  it('registered the service', () => {
    const service = app.service('attachments');

    assert.ok(service, 'Registered the service');
  });
});
