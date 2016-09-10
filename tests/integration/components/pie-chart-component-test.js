import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pie-chart-component', 'Integration | Component | pie chart component', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pie-chart-component}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pie-chart-component}}
      template block text
    {{/pie-chart-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
