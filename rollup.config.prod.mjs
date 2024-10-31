import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import {babel} from '@rollup/plugin-babel';

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from 'node:module';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'lib/tablehub.prod.min.js',
        name: 'tablehub',
        format: 'iife',
        globals: {
          'react': 'React',
          'react-dom/client': 'ReactDOM'
        },
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      babel({
        babelHelpers: 'bundled'
      }),
      postcss({
        extensions: ['.css'],
      }),
    ],
  },
  {
    input: 'lib/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: "src/style.css",
    output: [{ file: 'lib/index.css', format: 'es'}],
    plugins: [
        postcss({
            extract: true,
            minimize: true
        })
    ]
  }
];
