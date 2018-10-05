/* global __dirname:false */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../../config/index')
const webpack = require('webpack')
const path = require('path')
const _ = require('lodash')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const projectPath = process.cwd()

function getRootSizeStyle (designWidth) {
  if(config.responsive) {
    const fontSize = designWidth/ 10
    const rootFontSize = `style="font-size:${fontSize / ( designWidth / 2 ) * 100}vw"`
    return rootFontSize
  } else {
    return 'style="font-size:12px"'
  }
}
const webpackConfig = {
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: config.babelLoaderOptions
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: config.imageLoaderOptions,
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp3|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: config.imageLoaderOptions,
          },
        ],
      },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(_.assignIn(config.htmlWebpackPluginOptions, {
      template: `${projectPath}/${config.htmlWebpackPluginOptions.template}`,
      fontsize: getRootSizeStyle(config.designWidth)
    })),
    new CopyWebpackPlugin(config.CopyWebpackPluginOptions)
  ],
}

switch (config.library) {
case 'zepto':
  webpackConfig.module.rules.push({
    test: path.resolve('./node_modules/zepto/dist/zepto.js'),
    use: [{
      loader: 'exports-loader',
      options: 'window.$'
    }, 'script-loader']
  })
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin(_.assignIn({
      '$': 'zepto',
      'Zepto': 'zepto',
      'window.Zepto': 'zepto',
    }, config.ProvidePluginOptions))
  )
  break
case 'jquery':
  webpackConfig.module.rules.push({
    test: path.resolve('./node_modules/jquery/dist/jquery.js'),
    use: [{
      loader: 'exports-loader',
      options: 'window.$'
    }, 'script-loader']
  })
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin(_.assignIn({
      '$': 'jquery',
      'JQuery': 'jquery',
      'window.JQuery': 'jquery',
    }, config.ProvidePluginOptions))
  )
  break
default:
  webpackConfig.module.rules.push({
    test: path.resolve('./node_modules/zepto/dist/zepto.js'),
    use: [{
      loader: 'exports-loader',
      options: 'window.$'
    }, 'script-loader']
  })
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin(_.assignIn({
      '$': 'zepto',
      'Zepto': 'zepto',
      'window.Zepto': 'zepto',
    }, config.ProvidePluginOptions))
  )
  break
}

module.exports = webpackConfig


