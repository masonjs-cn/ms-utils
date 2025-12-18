const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const { visualizer } = require('rollup-plugin-visualizer')

// 根据环境变量决定是否启用 source map 和压缩
const isProduction = process.env.NODE_ENV === 'production'
const enableSourceMap = !isProduction
const enableMinify = isProduction // 生产环境启用压缩

// 创建压缩插件配置函数
const getMinifyPlugin = () => (enableMinify ? [terser()] : [])

module.exports = [
  // 主入口
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        sourcemap: enableSourceMap, // 开发环境启用 source map
        plugins: getMinifyPlugin() // 生产环境启用压缩
      },
      {
        dir: 'lib',
        format: 'esm',
        entryFileNames: '[name].esm.js',
        sourcemap: enableSourceMap, // 开发环境启用 source map
        plugins: getMinifyPlugin() // 生产环境启用压缩
      },
      {
        dir: 'lib',
        format: 'umd',
        entryFileNames: '[name].umd.js',
        name: 'MS_utils', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
        sourcemap: enableSourceMap, // 开发环境启用 source map
        plugins: getMinifyPlugin() // 生产环境启用压缩
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ 
        module: 'ESNext', 
        outDir: undefined,
        declarationDir: 'lib'
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'lib/stats.html'
      })
    ]
  },
  // validator 独立入口
  {
    input: './src/validator/index.ts',
    output: [
      {
        dir: 'lib/validator',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        sourcemap: enableSourceMap,
        plugins: getMinifyPlugin() // 生产环境启用压缩
      },
      {
        dir: 'lib/validator',
        format: 'esm',
        entryFileNames: '[name].esm.js',
        sourcemap: enableSourceMap,
        plugins: getMinifyPlugin() // 生产环境启用压缩
      }
    ],
    plugins: [resolve(), commonjs(), typescript({ 
      module: 'ESNext', 
      outDir: undefined,
      declarationDir: 'lib/validator'
    })]
  },
  // func 独立入口
  {
    input: './src/func/index.ts',
    output: [
      {
        dir: 'lib/func',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        sourcemap: enableSourceMap,
        plugins: getMinifyPlugin() // 生产环境启用压缩
      },
      {
        dir: 'lib/func',
        format: 'esm',
        entryFileNames: '[name].esm.js',
        sourcemap: enableSourceMap,
        plugins: getMinifyPlugin() // 生产环境启用压缩
      }
    ],
    plugins: [resolve(), commonjs(), typescript({ 
      module: 'ESNext', 
      outDir: undefined,
      declarationDir: 'lib/func'
    })]
  }
]
