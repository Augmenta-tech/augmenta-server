import { module, test } from 'qunit';
import { setupTest } from 'augmenta-server/tests/helpers';

module('Unit | Route | creator', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:creator');
    assert.ok(route);
  });
});
