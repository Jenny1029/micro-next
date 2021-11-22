const fs = require('fs');
const path = require('path');
const glob = require('glob');
const download = require('../lib/download'); //下载配置
const inquirer = require('inquirer');
// const logSymbols = require("log-symbols");
const chalk = require('chalk');
const { removeDir } = require('../lib/fsCollection'); // 删除文件js
// const generator = require('../lib/generator')// 模版插入
const CFonts = require('cfonts');

module.exports = (name, cmd, isSubApp) => {
  let projectName = name;
  // 当前目录为空，如果当前目录的名称和project-name一样，则直接在当前目录下创建工程，否则，在当前目录下创建以project-name作为名称的目录作为工程的根目录
  // 当前目录不为空，如果目录中不存在与project-name同名的目录，则创建以project-name作为名称的目录作为工程的根目录，否则提示项目已经存在，结束命令执行。
  // process.cwd() 是当前执行node命令时候的文件夹地址
  //__dirname 是被执行的js 文件的地址 ——文件所在目录
  const list = glob.sync('*'); // 遍历当前目录,数组类型
  let next = undefined;
  let rootName = path.basename(process.cwd());
  if (list.length) {
    // 如果当前目录不为空
    if (
      list.some((n) => {
        const fileName = path.resolve(process.cwd(), n);
        const isDir = fs.statSync(fileName).isDirectory();
        return projectName === n && isDir; // 找到创建文件名和当前目录文件存在一致的文件
      })
    ) {
      // 如果文件已经存在
      next = () =>
        new Promise((resolve, reject) => {
          inquirer
            .prompt([
              {
                name: 'isRemovePro',
                message: `项目${projectName}已经存在，是否覆盖文件`,
                type: 'confirm',
                default: false,
              },
            ])
            .then((answer) => {
              if (answer.isRemovePro) {
                removeDir(path.resolve(process.cwd(), projectName));
                rootName = projectName;
                resolve(projectName);
              } else {
                next = undefined;
                reject('停止创建');
              }
            });
        });
    } else {
      next = next = () => Promise.resolve(projectName);
    }
  } else if (rootName === projectName) {
    // 如果文件名和根目录文件名一致
    rootName = '.';
    next = () =>
      new Promise((resolve, reject) => {
        inquirer
          .prompt([
            {
              name: 'buildInCurrent',
              message:
                '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
              type: 'confirm',
              default: false,
            },
          ])
          .then((answer) => {
            if (answer.buildInCurrent) {
              resolve(answer.buildInCurrent ? '.' : projectName);
            } else {
              next = undefined;
              reject('停止创建');
            }
          });
      });
  } else {
    rootName = projectName;
    next = () => Promise.resolve(projectName); // 返回resole函数，并传递projectName
  }

  const go = async () => {
    try {
      const projectRoot = await next();
      inquirer
        .prompt([
          {
            type: 'list',
            message: '请选择您使用的微前端基座技术栈',
            name: 'techStack',
            choices: [
              { name: 'React', value: '1' },
              { name: 'vue 2.0', value: '2' },
              // { name: 'vue 3.0', value: '2' },
            ],
          },
        ])
        .then((answers) => {
          if (projectRoot !== '.') {
            fs.mkdirSync(projectRoot);
          }
          CFonts.say('Micro-Next-Cli', {
            font: 'block', // define the font face
            align: 'left', // define text alignment
            colors: ['#f80'], // define all colors
            background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
            letterSpacing: 1, // define letter spacing
            lineHeight: 1, // define the line height
            space: true, // define if the output text should have empty lines on top and on the bottom
            maxLength: '0', // define how many character can be on one line
          });
          return download({
            projectRoot,
            techStack: answers.techStack,
            isSubApp,
          }).then((context) => {
            const successLog = `cd ${projectRoot}\nnpm install\n${
              context.techStack === '1' ? 'npm run start' : 'npm run serve'
            }`;
            console.log(chalk.green(successLog));
          });
        });
    } catch (err) {
      console.error(chalk.red(`${err}`));
    }
  };

  next && go();
};
