import { module, test } from 'qunit';
import { setupRenderingTest } from 'support-platform-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comment-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CommentSection />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CommentSection>
        template block text
      </CommentSection>
    `);

    assert.dom().hasText('template block text');
  });
});
