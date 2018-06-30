/* eslint-disable no-console */
const _ = require('lodash')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./base')
const postcssOptions = require('./postcss.js')
const config = require('../../config')

const projectPath = process.cwd()

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: '#cheap-module-source-map',
  entry: `${projectPath}/src/js/index.js`,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {loader: 'postcss-loader', options: postcssOptions},'sass-loader'],
          publicPath: config.outputCssPublicPath,
        }),
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     {loader: 'postcss-loader', options: postcssOptions},'sass-loader'
      //   ],
      //   publicPath: config.outputCssPublicPath,
      // }
    ],
  },
  plugins: [
    new CleanWebpackPlugin([config.output.path], {
      root: projectPath,
      verbose: true,
    }),
    new UglifyJSPlugin(config.UglifyJsPluginOptions),
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
    }),
    new ExtractTextPlugin(config.outputCSS, {
      allChunks: true,
    })
  ],
})