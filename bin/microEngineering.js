const fs = require('fs');
const {
  createFile,
  // insertReactSrcFileData,
  insertReactPackageData,
  insertSubReactPackageData,
  insertVuePackageData,
  insertSubVueConfig,
} = require('../lib/fsCollection');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = (isSubApp) => {
  const rootName = process.cwd();
  inquirer
    .prompt([
      {
        type: 'list',
        message:
          '请选择您当前的项目技术栈，我们会根据您的项目技术栈类型帮您的项目微前端化',
        name: 'techStack',
        choices: [
          { name: 'React', value: '1' },
          { name: 'vue 2.0', value: '2' },
          // { name: 'vue 3.0', value: '2' },
        ],
      },
    ])
    .then((answer) => {
      // 子应用项目改造微前端
      if (isSubApp) {
        if (answer.techStack === '1') {
          try {
            createFile(
              '../template/react/sub/public-path.js',
              '/src',
              'public-path.js'
            );
            createFile(
              '../template/react/sub/config-overrides.js',
              '/',
              'config-overrides.js'
            );
            createFile(
              '../template/react/sub/MicroApp.js',
              '/',
              'src/MicroApp.js'
            );
            createFile(
              '../template/react/sub/microIndex.js',
              '/',
              'src/microIndex.js'
            );
            insertSubReactPackageData('package.json');
            console.log(
              chalk.green(`项目微前端化成功\nnpm install\nnpm run micro:start`)
            );
          } catch (err) {
            console.log(
              chalk.red(
                '项目微前端化失败，目前该脚手架尚不能为您定制化，您可以在新的项目目录下使用micro-next-cli sub [app-name] 初始化微前端子应用并按照项目示例进行改造，或者查看qiankun https://qiankun.umijs.org/zh/guide/getting-started#%E5%BE%AE%E5%BA%94%E7%94%A8 文档进行改造'
              )
            );
          }
        } else {
          try {
            createFile(
              '../template/vue/sub/public-path.js',
              '/src',
              'public-path.js'
            );
            createFile(
              '../template/vue/sub/MicroApp.vue',
              '/',
              'src/MicroApp.vue'
            );
            createFile(
              '../template/vue/sub/microMain.js',
              '/',
              'src/microMain.js'
            );
            insertSubVueConfig('vue.config.js');
            console.log(
              chalk.green(`项目微前端化成功\nnpm install\nnpm run serve`)
            );
          } catch (err) {
            console.log(err);
            console.log(
              chalk.red(
                '项目微前端化失败，目前该脚手架尚不能为您定制化，您可以在新的项目目录下使用micro-next-cli sub [app-name] 初始化微前端子应用并按照项目示例进行改造，或者查看qiankun https://qiankun.umijs.org/zh/guide/getting-started#%E5%BE%AE%E5%BA%94%E7%94%A8 文档进行改造'
              )
            );
          }
        }
      } else {
        // 主应用项目改造成微前端
        if (answer.techStack === '1') {
          // react项目定制化改造
          try {
            // 添加微前端列表
            createFile(
              '../template/react/main/microAppList.js',
              '/src',
              'microAppList.js'
            );
            createFile('../template/react/main/micro.css', '/src', 'micro.css');
            createFile(
              '../template/react/main/MicroApp.js',
              '/src',
              'MicroApp.js'
            );
            createFile(
              '../template/react/main/microIndex.js',
              '/src',
              'microIndex.js'
            );
            createFile(
              '../template/react/main/config-overrides.js',
              './',
              'config-overrides.js'
            );
            insertReactPackageData('package.json');
            console.log(
              chalk.green(`项目微前端化成功\nnpm install\nnpm run micro:start`)
            );
          } catch (err) {
            console.log(err);
            console.log(
              chalk.red(
                '项目微前端化失败，目前该脚手架尚不能为您定制化，您可以在新的项目目录下使用micro-next-cli init [app-name] 初始化微前端基座并按照项目示例进行改造，或者查看qiankun https://qiankun.umijs.org/zh/guide/getting-started#%E4%B8%BB%E5%BA%94%E7%94%A8 文档进行改造'
              )
            );
          }
        } else {
          try {
            // 添加微前端列表
            createFile(
              '../template/vue/main/microAppList.js',
              '/src',
              'microAppList.js'
            );
            createFile(
              '../template/vue/main/MicroApp.vue',
              '/src',
              'MicroApp.vue'
            );
            createFile(
              '../template/vue/main/microMain.js',
              '/src',
              'microMain.js'
            );
            insertVuePackageData('package.json');
            console.log(
              chalk.green(`项目微前端化成功\nnpm install\nnpm run micro:start`)
            );
          } catch (err) {
            console.log(err);
            console.log(
              chalk.red(
                '项目微前端化失败，目前该脚手架尚不能为您定制化，您可以在新的项目目录下使用micro-next-cli init [app-name] 初始化微前端基座并按照项目示例进行改造，或者查看qiankun https://qiankun.umijs.org/zh/guide/getting-started#%E4%B8%BB%E5%BA%94%E7%94%A8 文档进行改造'
              )
            );
          }
        }
      }
    });
};
