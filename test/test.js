const test = require('ava');
const eslint = require('../source');
const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const {
  promises: {
    readFile,
    writeFile
  }
} = require('fs');

test('runs with the plugin', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/all-good.js',
    plugins: [
      eslint()
    ]
  });

  const {
    output: [ output ]
  } = await bundle.generate({});

  t.true(output.code.length > 0);
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

  const {
    output: [ output ]
  } = await bundle.generate({});

  t.true(output.code.length > 0);
});

test('autofix works', async t => {
  const filePath = 'test/fixtures/will-fix.js';
  const originalFileContents = await readFile(filePath);

  const bundle = await rollup({
    input: 'test/fixtures/will-fix.js',
    plugins: [
      eslint({ fix: true })
    ]
  });
  const {
    output: [ output ]
  } = await bundle.generate({});

  await writeFile(filePath, originalFileContents);

  t.true(output.code.includes('const func'));
});

test('ignores node_modules', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/no-node-modules.js',
    plugins: [
      eslint()
    ]
  });

  const {
    output: [ output ]
  } = await bundle.generate({});

  t.true(output.code.length > 0);
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

  const {
    output: [ output ]
  } = await bundle.generate({});

  t.true(output.code.includes('var'));
});
