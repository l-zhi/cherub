/* eslint-disable no-console */
const _ = require('lodash')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConfig = require('./base')
const postcssOptions = require('./postcss.js')
const config = require('../../config')
const projectPath = path.resolve('./')

const hotReloadEntries = [
  require.resolve('webpack-dev-server/client') + '?/',
  require.resolve('webpack/hot/dev-server'),
]

const webpackConfig = merge(baseConfig, {
  mode:'development',
  devtool: '#cheap-module-eval-source-map',
  entry: _.concat(hotReloadEntries, `${projectPath}/${config.entry}`),
  output: {
    filename: config.output.filename,
    path: path.resolve(projectPath, config.output.path),
  },
  resolveLoader: {
    modules: [`${__dirname}/../../../node_modules`]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {loader: 'postcss-loader', options: postcssOptions}, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([config.output.path], {
      root: projectPath,
      verbose: true,
    }),
    new webpack.HotModuleReplacementPlugin(config.HotModuleReplacementPluginOptions),
    new webpack.ProgressPlugin(function(percentage, msg) {
      var stream = process.stderr
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0)
        stream.write('  ' + msg)
        stream.clearLine(1)
      } else if (percentage === 1) {
        console.log('')
        console.log('webpack: bundle build is now finished.')
      }
    })
  ],
  devServer: _.assignIn(config.devServer, {
    contentBase: `${projectPath}/${config.devServer.contentBase}`
  })
})

module.exports = webpackConfig