/* eslint-disable no-console */
const chalk = require('chalk')
const Ora = require('ora')

const loader = new Ora({
  text: '',
  spinner: 'dots'
})

const fileExits = (name) => {
  loader.color = 'yellow'
  loader.text = chalk.red(
    `We cannot create a project called ${chalk.green(
      name
    )} \nbecause a project with the same name exists.\n`
  ) + chalk.red('Please choose a different project name.')
  loader.fail().clear()
}

const beforeCreateProject = (projectPath) => {
  loader.color = 'yellow'
  loader.text = `Creating a new project in ${chalk.green(projectPath)}.`
  loader.start()
}

const afterCreateProject = () => {
  loader.succeed()
}

const beforeInstall = () => {
  loader.color = 'yellow'
  loader.text = 'npm install the dependencies.'
  loader.start()
}

const afterInstall = () => {
  loader.succeed()
}

const createHelper = (commandName) => {
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(commandName)} ${chalk.green('create <project-directory> --template [options]')}`
  )
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(commandName)} ${chalk.green('create demo -t base')}`)
  console.log()
  console.log(
    `Run ${chalk.cyan(`${commandName} --help`)} to see all options.`
  )
}

module.exports = {
  fileExits,
  beforeCreateProject,
  afterCreateProject,
  createHelper,
  beforeInstall,
  afterInstall
}