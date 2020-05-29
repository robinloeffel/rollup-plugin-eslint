# robins-rollup-plugin-eslint

[![latest version on npm](https://img.shields.io/npm/v/robins-rollup-plugin-eslint)](https://www.npmjs.com/package/robins-rollup-plugin-eslint) [![npm downloads a month](https://img.shields.io/npm/dm/robins-rollup-plugin-eslint)](https://www.npmjs.com/package/robins-rollup-plugin-eslint) [![required node version](https://img.shields.io/node/v/robins-rollup-plugin-eslint)](https://github.com/nodejs/Release) [![dependency status](https://img.shields.io/david/robinloeffel/rollup-plugin-eslint)](https://david-dm.org/robinloeffel/rollup-plugin-eslint) [![eslint dependency](https://img.shields.io/npm/dependency-version/robins-rollup-plugin-eslint/eslint?label=eslint%20dep)](https://github.com/eslint/eslint) [![rollup peer dependency](https://img.shields.io/npm/dependency-version/robins-rollup-plugin-eslint/peer/rollup?label=rollup%20peer%20dep)](https://github.com/rollup/rollup) [![package license](https://img.shields.io/npm/l/robins-rollup-plugin-eslint)](license)

> Lint your [Rollup](https://github.com/rollup/rollup) bundles with [ESLint](https://github.com/eslint/eslint). 🐝

Nicely integrates the most recent version of [`eslint`](https://github.com/eslint/eslint) into a [`rollup`](https://github.com/rollup/rollup) plugin.

## How

```sh
yarn add robins-rollup-plugin-eslint --dev
```

```js
import eslint from 'robins-rollup-plugin-eslint';
// ...

export default {
  // ..
  plugins: [
    eslint()
    // ..
  ]
};
```

## Config

This plugin respects your [ESLint configuration](https://eslint.org/docs/user-guide/configuring) as per default. Apart from that, it can take two configuration objects. The first one is intended for the [ESLint constructor](https://eslint.org/docs/developer-guide/nodejs-api#%E2%97%86-new-eslint-options) and gets right passed through, the second one can contain `include` and `exclude` patterns for Rollup's [`filter` plugin](https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter). You can check out all the possible values by visiting the links in this paragraph.

```js
import eslint from 'robins-rollup-plugin-eslint';
// ...

const development = process.env.ROLLUP_WATCH === 'true';
// ...

export default {
  // ..
  plugins: [
    eslint({
      fix: development
    }, {
      exclude: 'src/no-lint/**/*'
    })
    // ..
  ]
};
```

## Why a new plugin?

Because [`rollup-plugin-eslint`](https://github.com/TrySound/rollup-plugin-eslint) seems to be dead and I got frustrated waiting for a bugfix.

## License

MIT
