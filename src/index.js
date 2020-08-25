const { ESLint } = require('eslint');
const { createFilter } = require('@rollup/pluginutils');
const { relative } = require('path');

module.exports = (options = {}) => {
  const {
    filterInclude,
    filterExclude = 'node_modules/**',
    throwOnWarning = false,
    throwOnError = false,
    ...eslintOptions
  } = options;
  const filter = createFilter(filterInclude, filterExclude);
  const eslint = new ESLint(eslintOptions);

  return {
    name: 'eslint',
    transform: async (code, id) => {
      if (filter(id)) {
        const results = await eslint.lintText(code, {
          filePath: id
        });
        const [ result ] = results;

        if (eslintOptions.fix) {
          await ESLint.outputFixes(results);
        }

        const formatter = await eslint.loadFormatter('stylish');
        const output = formatter.format(results);

        if (output.length > 0) {
          console.log(output);
        }

        if (result.warningCount > 0 && throwOnWarning) {
          throw new Error(`Found ${result.warningCount} warning(s) in ${relative('.', result.filePath)}!`);
        }

        if (result.errorCount > 0 && throwOnError) {
          throw new Error(`Found ${result.errorCount} error(s) in ${relative('.', result.filePath)}!`);
        }

        return result.output || null;
      }

      return null;
    }
  };
};
