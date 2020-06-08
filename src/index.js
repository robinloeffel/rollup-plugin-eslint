const { ESLint } = require('eslint');
const { createFilter } = require('@rollup/pluginutils');

module.exports = (
  eslintOptions = {},
  filterOptions = {}
) => {
  const filter = createFilter(
    filterOptions.include,
    filterOptions.exclude || 'node_modules/**'
  );
  const eslint = new ESLint(eslintOptions);

  return {
    name: 'eslint',
    transform: async (code, id) => {
      if (filter(id)) {
        const result = await eslint.lintText(code, {
          filePath: id
        });

        if (eslintOptions.fix) {
          await ESLint.outputFixes(result);
        }

        const formatter = await eslint.loadFormatter('stylish');
        const output = formatter.format(result);

        if (output.length > 0) {
          console.log(output);
        }

        return result[0].output || null;
      }

      return null;
    }
  };
};
