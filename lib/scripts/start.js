/* eslint-disable no-console */
process.on('unhandledRejection', err => {
  throw err
})

const ip = require('ip')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const openBrowser = require('../utils/openBrowser')
const clearConsole = require('../utils/clearConsole')
const devConfig = require('./webpack/dev')
const config = require('../config')

const isInteractive = process.stdout.isTTY
const compiler = webpack(devConfig)

compiler.plugin('done', stats => {
  if (isInteractive) {
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

const server = new WebpackDevServer(compiler, devConfig.devServer)
const getIP = (template) => {
  return template === 'pwa' ? '127.0.0.1': ip.address()
}

const ipAddress = getIP(config.template)

server.listen(devConfig.devServer.port, ipAddress, (err, stats) => {
  if (err) {
    return console.log(err, stats)
  }
  if (isInteractive) {
    clearConsole()
  }
  console.log(chalk.cyan('Starting the development server...\n'))
  openBrowser(`${devConfig.devServer.https ? 'https' : 'http'}://${ipAddress}:${devConfig.devServer.port}`)
})