/* eslint-disable no-console */
const _ = require('lodash')
const allConfig = require('./all')
const path = require('path')
const defaultConfig = require('./default')
let customConfig = {}
try {
  customConfig = require(path.resolve('./.cherub'))
} catch (error) {
  console.error(error)
}

module.exports = _.defaultsDeep(customConfig || {}, defaultConfig, allConfig)
