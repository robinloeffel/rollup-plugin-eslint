const test = require('ava');
const eslint = require('../src');
const { rollup } = require('rollup');

test('rollup runs with the plugin', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [ eslint() ]
  });
  const { output } = await bundle.generate({
    file: 'test/fixtures/all-good.js'
  });

  t.truthy(output);
});

test('rollup runs with the plugin being configured', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [
      eslint({
        fix: true
      }, {
        exclude: '**/**'
      })
    ]
  });
  const { output } = await bundle.generate({
    file: 'test/fixtures/all-good.js'
  });

  t.truthy(output);
});
