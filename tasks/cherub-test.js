const program = require('commander')

program
  .version(1)
  .command('test [project-directory]')
  .description('run create commands for generate project')

  program.parse(process.argv)
  