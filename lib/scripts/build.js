/* eslint-disable no-console */
'use strict'

process.on('unhandledRejection', err => {
  throw err
})

const webpack = require('webpack')
const clearConsole = require('../utils/clearConsole')
const prodConfig = require('./webpack/prod')

const isDebug = true
const isInteractive = process.stdout.isTTY

console.log('prodConfig :', prodConfig)
const compiler = webpack(prodConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    console.error(err)
    return
  }
  const info = stats.toJson()
  //处理代码编译中产生的error
  if (stats.hasErrors()) {
    console.error(info.errors)
  }
  //处理代码编译中产生的warning
  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
})
    

compiler.plugin('done', stats => {
  if (isInteractive && !isDebug) {
    clearConsole()
  }
  process.stdout.write(stats.toString({
    colors: true,
    reasons: true,
    errorDetails: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
