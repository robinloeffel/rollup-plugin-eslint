# Changelog

## v1.1.3
_2020-10-12_

- Reference `types` in [`package.json`](package.json)

## v1.1.2
_2020-08-29_

- Use rollup's [`load` hook](https://rollupjs.org/guide/en/#load) instead of the [`transform` hook](https://rollupjs.org/guide/en/#transform) #4
- Add typings

## v1.1.1
_2020-08-15_

- Upgrade [`@rollup/pluginutils`](https://github.com/rollup/plugins/blob/master/packages/pluginutils/CHANGELOG.md) to v4

## v1.1.0
_2020-08-03_

- Introduce [`throwOnWarning`](readme.md#throwOnWarning) and [`throwOnError`](readme.md#throwOnError) options

## v1.0.0
_2020-06-29_

- **Breaking:** Unify the `options` object, see [readme.md](readme.md#config)

## v0.1.4
_2020-06-09_

- Re-release as `@rbnlffl/rollup-plugin-eslint`

## v0.1.3
_2020-06-08_

- Correctly ignore `node_modules` per default

## v0.1.2
_2020-06-02_

- Fix incorrect `main` prop in package.json

## v0.1.1
_2020-05-30_

- Increase performance by instantiating ESLint only once

## v0.1.0
_2020-05-28_

- Initial release
