import { type Plugin } from "rollup";
import { type RollupESLintOptions } from "./types/plugin-options.js";

import thrower from "./util/thrower.js";
import { ESLint } from "eslint";
import { createFilter } from "@rollup/pluginutils";

export default ({
  filterInclude,
  filterExclude = "node_modules/**",
  throwOnWarning = false,
  throwOnError = false,
  ...eslintOptions
}: RollupESLintOptions = {}): Plugin => {
  const filter = createFilter(filterInclude, filterExclude);
  const eslint = new ESLint(eslintOptions);
  const filesToLint: string[] = [];

  return {
    name: "eslint",
    load: id => {
      if (filter(id)) {
        filesToLint.push(id);
      }
    },
    buildEnd: async () => {
      const results = await eslint.lintFiles(filesToLint);
      const formatter = await eslint.loadFormatter("stylish");
      const output = await formatter.format(results);

      if (eslintOptions.fix) {
        await ESLint.outputFixes(results);
      }

      if (output.length > 0) {
        console.log(output);
      }

      if (throwOnWarning) {
        thrower(results, "warning");
      }

      if (throwOnError) {
        thrower(results, "error");
      }
    }
  };
};
