#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const create = require('./create');
const microEngineering = require('./microEngineering');

// 创建主应用
program
  .command('basic <app-name>')
  .description('create a new main project powered by micro-next-cli')
  .option('basic', 'basic <app-name>')
  .action((name, cmd) => {
    create(name, cmd, false);
  });

// 创建子应用
program
  .command('sub <app-name>')
  .description('create a new sub project powered by micro-next-cli')
  .option('sub', 'sub <app-name>')
  .action((name, cmd) => {
    create(name, cmd, true);
  });

// 已有主应用微前端化
program
  .command('basic-micro')
  .description('Engineer already main app micro powered by micro-next-cli')
  .option('basicEngineering')
  .action(() => {
    microEngineering(false);
  });

// 已有子应用微前端化
program
  .command('sub-micro')
  .description('Engineer already sub app micro powered by micro-next-cli')
  .option('subEngineering')
  .action(() => {
    microEngineering(true);
  });

program.version(pkg.version, '-v --version').usage('<command> [options]');
program.parse(process.argv);
