const fs = require('fs');
const test = require('ava');
const eslint = require('../src');
const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');

test('runs with the plugin', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [
      eslint()
    ]
  });
  const { output } = await bundle.generate({ file: '' });

  t.true(output[0].code.length > 0);
});

test('runs with the plugin and a configuration', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [
      eslint({
        fix: true,
        filterInclude: 'src/**'
      })
    ]
  });
  const { output } = await bundle.generate({ file: '' });

  t.true(output[0].code.length > 0);
});

test('autofix works', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/will-fix.js',
    plugins: [
      eslint({ fix: true })
    ]
  });
  const { output } = await bundle.generate({ file: '' });

  // revert file contents
  const fixed = fs.readFileSync('test/fixtures/will-fix.js').toString();
  const reverted = fixed.replace(/const/g, 'var');
  fs.writeFileSync('test/fixtures/will-fix.js', reverted);

  t.true(output[0].code.includes('const func'));
});

test('ignores node_modules', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/no-node-modules.js',
    plugins: [
      eslint()
    ]
  });
  const { output } = await bundle.generate({ file: '' });

  t.true(output[0].code.length > 0);
});

test('runs with typescript', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/ts-order.ts',
    plugins: [
      eslint({
        overrideConfig: {
          parser: '@typescript-eslint/parser',
          plugins: [ '@typescript-eslint' ],
          extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended'
          ]
        }
      }),
      typescript(),
      terser()
    ]
  });
  const { output } = await bundle.generate({ file: '' });

  t.true(output[0].code.includes('var'));
});
