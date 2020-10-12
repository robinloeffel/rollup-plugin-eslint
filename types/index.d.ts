import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'rollup';
import { ESLint } from 'eslint';

export interface RollupEslintOptions extends ESLint.Options {
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
   * A single picomatch pattern or an array of patterns controlling
   * which files this plugin should explicitly include
   * @default undefined
   */
  filterInclude?: FilterPattern,

  /**
   * A single picomatch pattern or an array of patterns controlling
   * which files this plugin should explicitly exclude
   * @default 'node_modules/**'
   */
  filterExclude?: FilterPattern
}

export default function(options?: RollupEslintOptions): Plugin;
