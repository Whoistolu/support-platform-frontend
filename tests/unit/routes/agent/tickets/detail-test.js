import { module, test } from 'qunit';
import { setupTest } from 'support-platform-frontend/tests/helpers';

module('Unit | Route | agent/tickets/detail', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:agent/tickets/detail');
    assert.ok(route);
  });
});
