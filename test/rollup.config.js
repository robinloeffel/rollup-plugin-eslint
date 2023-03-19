import eslint from "../dist/index.js";

const absolute = relative => new URL(relative, import.meta.url).pathname;

/** @type {import('rollup').RollupOptions} */
export default {
  input: [
    absolute("./fixtures/all-good.js"),
    absolute("./fixtures/no-node-modules.js"),
    absolute("./fixtures/should-be-ignored.js"),
    absolute("./fixtures/will-fix.js")
  ],
  plugins: [
    eslint({
      throwOnError: true,
      filterExclude: [
        /should-be-ignored/,
        /node_modules/
      ]
    })
  ]
};
