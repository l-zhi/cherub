/* eslint-disable no-console */
/**
 * Module dependencies.
 */
const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const _ = require('lodash')
const inquirer = require('inquirer')
const packageJson = require('../../package.json')
const defaultConfig = require('../../lib/config/default')
const program = require('commander')
const echo = require('../utils/message')
const ncp = require('ncp').ncp
ncp.limit = 16
const templates = ['base', 'pwa']
const config = require('../../lib/config')
let projectName
let template
let useTypeScript = false
let isPC = false
const spawn = require('cross-spawn')

program
  .option('-t, --template [template]', 'which template to use')
  .action(function(dir, options){
    const idx = _.indexOf(templates, options.template)
    template = templates[idx] || false
    dir = dir || template
    projectName = dir
  })

program.parse(process.argv)

const questions = [
  {
    type: 'input',
    name: 'fileName',
    message: 'What\'s your project file name?',
    validate: function(value) {
      var pass = /^[0-9a-zA-Z.\-_]+$/.test(value)
      if (pass) {
        return true
      }
      return 'Please enter a valid file name'
    }
  },
  {
    type: 'list',
    name: 'template',
    message: 'What template do you need?',
    choices: templates,
    filter: function(val) {
      return val.toLowerCase()
    }
  },
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: 'use TypeScript?',
    default: false
  },
]


if(isAutoCreateApp(projectName, template)) {
  createApp(projectName, template)
} else {
  inquirer.prompt(questions).then(answers => {
    projectName = answers.fileName
    template = answers.template
    useTypeScript = answers.useTypeScript
    createApp(projectName, template)
  })
}

function isAutoCreateApp (projectName, template) {
  return projectName && template
}

function createApp(name, template) {
  const root = path.resolve(name)
  const appName = path.basename(root)
  checkAppName(name) // 查看目录是否已经存在
  fs.ensureDirSync(name)

  echo.beforeCreateProject(root)
  ncp(`${__dirname}/../../templates/${template}`, path.join(root, './src'), function (err) {
    if (err) {
      return console.error(err)
    }
    echo.afterCreateProject(name)
    generateConfigs(root, appName)
  })
}

function checkAppName(name) {
  if(fs.existsSync(name)) {
    echo.fileExits(name)
    process.exit(1)
  }
}

function generatePackageConfig(root, appName) {
  const json = {
    name: appName,
    version: packageJson.version,
    main: config.entry,
    scrips: {},
    author: '',
    license: 'ISC',
    devDependencies: {},
    dependencies: {}
  }
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(json, null, 2) + os.EOL
  )
}

function generateCherubConfig(root) {
  const customOptions = (() => {
    try {
      const tplConfig = require(`${__dirname}/../../lib/config/${template}.js`)
      return tplConfig
    } catch (error) {
      return {}
    }
  })()

  const cherubConfig = _.assignIn(defaultConfig, customOptions)
  
  cherubConfig.template = template || 'base'

  if(useTypeScript) {
    cherubConfig.entry = cherubConfig.entry.replace(/\.js$/, '.ts')
    const oldFile = `${root}/src/js/index.js`
    const newFile = `${root}/src/js/index.ts`
    fs.renameSync(oldFile, newFile)
  }
  
  fs.writeFileSync(
    path.join(root, '.cherub.js'),
    `module.exports = ${JSON.stringify(cherubConfig, null, 2)}` + os.EOL
  )
}

function generateTypeScriptConfig(root) {
  const json = {
    'compilerOptions': {
      'target': 'es6',
      'module': 'commonjs',
      'sourceMap': true
    },
    'exclude': [
      'node_modules',
      'typings/main',
      'typings/main.d.ts'
    ]
  }
  fs.writeFileSync(
    path.join(root, 'tsconfig.json'),
    JSON.stringify(json, null, 2) + os.EOL
  )
}

function getDependencies() {
  let library = 'zepto'
  if(isPC) {
    library = 'jquery'
  }
  if(useTypeScript) {
    return [`@types/${library}`]
  } else {
    return [library]
  }
}

function install() {
  const dependencies = getDependencies()
  return new Promise((resolve, reject) => {
    let command
    let args
    command = 'npm'
    args = [
      'install',
      '--save',
      '--save-exact',
      '--loglevel',
      'error',
    ].concat(dependencies)
    echo.beforeInstall()
    const child = spawn(command, args, { stdio: 'ignore' })
    child.on('close', code => {
      echo.afterInstall()
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
  })
}

function generateConfigs(root, appName) {
  generatePackageConfig(root, appName)
  generateCherubConfig(root)
  if(useTypeScript) {
    generateTypeScriptConfig(root)
  }
  try {
    process.chdir(`${root}`)
  } catch (err) {
    console.error(`chdir: ${err}`)
  }
  install()
}