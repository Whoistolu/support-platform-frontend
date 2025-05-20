import { module, test } from 'qunit';
import { setupRenderingTest } from 'support-platform-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | agent-ticket-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AgentTicketList />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <AgentTicketList>
        template block text
      </AgentTicketList>
    `);

    assert.dom().hasText('template block text');
  });
});
