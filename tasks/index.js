#!/usr/bin/env node
const program = require('commander')
const packageJson = require('../package.json')

program
  .version(packageJson.version)
  .description('Fake package manager')
  .command('create [project-directory] [options]', 'generate project')
  .command('start', 'npm start')
  .command('build', 'npm build')
  .command('test', 'npm test')
  .parse(process.argv)