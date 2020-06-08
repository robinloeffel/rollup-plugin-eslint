const fs = require('fs');
const test = require('ava');
const eslint = require('../src');
const { rollup } = require('rollup');

test.after(() => {
  // revert `will-fix.js` to contain `var` instead of `const`
  const path = 'test/fixtures/will-fix.js';
  const fixed = fs.readFileSync(path).toString();
  const reverted = fixed.replace(/const/g, 'var');
  fs.writeFileSync(path, reverted);
});

test('rollup runs with the plugin', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [
      eslint()
    ]
  });
  const { output } = await bundle.generate({
    file: 'test/fixtures/all-good.js'
  });

  t.true(output[0].code.length > 0);
});

test('rollup runs with the plugin and a configuration', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [
      eslint({
        fix: true
      }, {
        include: 'src/**'
      })
    ]
  });
  const { output } = await bundle.generate({
    file: 'test/fixtures/all-good.js'
  });

  t.true(output[0].code.length > 0);
});

test('eslint autofix works', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/will-fix.js',
    plugins: [
      eslint({
        fix: true
      })
    ]
  });
  const { output } = await bundle.generate({
    file: 'test/fixtures/will-fix.js'
  });

  t.true(output[0].code.includes('const func'));
});
