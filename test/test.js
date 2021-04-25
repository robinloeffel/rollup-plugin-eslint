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
    output: [ chunk ]
  } = await bundle.generate({});

  t.true(chunk.code.length > 0);
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
    output: [ chunk ]
  } = await bundle.generate({});

  t.true(chunk.code.length > 0);
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
    output: [ chunk ]
  } = await bundle.generate({});

  await writeFile(filePath, originalFileContents);

  t.true(chunk.code.includes('const func'));
});

test('ignores node_modules', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/no-node-modules.js',
    plugins: [
      eslint()
    ]
  });

  const {
    output: [ chunk ]
  } = await bundle.generate({});

  t.true(chunk.code.length > 0);
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
    output: [ chunk ]
  } = await bundle.generate({});

  t.true(chunk.code.includes('var'));
});

test('does not run on files it shouldn\'t', async t => {
  const bundle = await rollup({
    input: 'test/fixtures/should-be-ignored.js',
    plugins: [
      eslint({
        filterExclude: /should-be-ignored/,
        throwOnWarning: true,
        throwOnError: true
      })
    ]
  });

  await bundle.generate({});

  // an error would've been thrown if the file
  // were looked at. since this was not the case,
  // else it would've been caught, simply pass
  // the test
  t.pass();
});
