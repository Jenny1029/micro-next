const download = require('download-git-repo');
const path = require('path');
// const ora = require('ora')

// 主应用对应的模板url
const mainAppUrlMap = {
  1: 'https://github.com/Jenny1029/micro-template.git#basic-react',
  2: 'https://github.com/Jenny1029/micro-template.git#basic-vue',
  //3: 'https://github.com/Jenny1029/vue.git#master',
};

// 子应用对应的模板url
const subApppUrlMap = {
  1: 'https://github.com/Jenny1029/micro-template.git#sub-react',
  2: 'https://github.com/Jenny1029/micro-template.git#sub-vue',
  //3: 'https://github.com/Jenny1029/vue.git#master',
};

module.exports = function ({ projectRoot, techStack, isSubApp }) {
  const url = isSubApp ? subApppUrlMap[techStack] : mainAppUrlMap[techStack];
  // const spinner = ora(`正在下载项目模板，源地址：${url}`)
  // target = path.join(CONST.TEMPLATE_NAME)
  // spinner.start()
  return new Promise((resolve, reject) => {
    download(`direct:${url}`, projectRoot || 'test', { clone: true }, (err) => {
      if (err) {
        // spinner.fail()
        // console.log(logSymbols.fail, chalk.red("模板下载失败"));
        reject(err);
      } else {
        // spinner.succeed()
        // console.log(logSymbols.success, chalk.green("模板下载完毕"));
        resolve({ projectRoot, techStack, isSubApp });
      }
    });
  });
};
