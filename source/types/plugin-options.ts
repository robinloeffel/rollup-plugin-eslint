import { type FilterPattern } from "@rollup/pluginutils";
import { ESLint } from "eslint";

export interface RollupESLintOptions extends ESLint.Options {
  /**
   * controls whether or not to throw an error and exit the
   * process when eslint reports any warnings
   * @default false
   */
  throwOnWarning?: boolean,

  /**
   * controls whether or not to throw an error and exit the
   * process when eslint reports any errors
   * @default false
   */
  throwOnError?: boolean,

  /**
   * a single picomatch pattern or an array of patterns controlling
   * which files this plugin should explicitly include
   * @default undefined
   */
  filterInclude?: FilterPattern,

  /**
   * a single picomatch pattern or an array of patterns controlling
   * which files this plugin should explicitly exclude
   * @default 'node_modules/**'
   */
  filterExclude?: FilterPattern
}
