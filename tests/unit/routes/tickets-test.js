import { module, test } from 'qunit';
import { setupTest } from 'support-platform-frontend/tests/helpers';

module('Unit | Route | tickets', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tickets');
    assert.ok(route);
  });
});
