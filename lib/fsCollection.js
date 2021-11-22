// 删除文件系统
const fs = require('fs');
const path = require('path');

/* 
 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
 4. fs.appendFile 写入追加文件 
 5.fs.readFile 读取文件 
 6.fs.readdir 读取目录 
 7.fs.rename 重命名 
 8. fs.rmdir  删除目录 
 9. fs.unlink 删除文件 
*/

// 删除文件目录
const removeDir = (dir) => {
  let files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);

    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
};

/**
 * 1.读取当前目录
 * 2.将
 * 2.判断当前路径path下有没有该文件
 *
 *  */
const createFile = (templatePath, targetPath, targetFile) => {
  // 读取文件
  const filedata = fs.readFileSync(path.join(__dirname, templatePath));
  // 当前指令运行的环境
  let rootName = process.cwd();
  // __dirname指当前文件目录
  // 检查给定目录是否存在, err存在表明没有该文件, 创建该文件目录
  try {
    fs.accessSync(path.join(rootName, targetPath), fs.constants.F_OK);
    fs.writeFileSync(
      path.join(rootName, `${targetPath}/${targetFile}`),
      filedata
    );
  } catch (err) {
    fs.mkdirSync(path.join(rootName, targetPath));
    fs.writeFileSync(
      path.join(rootName, `${targetPath}/${targetFile}`),
      filedata
    );
  }
};

const insertReactPackageData = (targetFilePath) => {
  let rootName = process.cwd();
  const data = fs
    .readFileSync(path.join(rootName, targetFilePath), 'utf8')
    .split('\n');
  let insertNpmIndex = 0;
  let insertScriptsIndex = 0;
  const hasQiankun = data.filter((item) => item.includes('qiankun'));
  if (hasQiankun.length) return;
  const hasReactAppRewired = false;
  const hasRouterDOM = false;
  data.forEach((item, index) => {
    if (item.includes('"dependencies":')) {
      insertNpmIndex = index;
    }
    // 可能会出现npm里面包含scripts
    if (item.includes('"scripts":')) {
      insertScriptsIndex = index;
    }
    if (item.includes('"react-app-rewired":')) {
      hasReactAppRewired = true;
    }
    if (item.includes('"react-router-dom":')) {
      hasRouterDOM = true;
    }
  });

  insertNpmIndex &&
    data.splice(
      insertNpmIndex + 1,
      0,
      `${!hasReactAppRewired ? `"react-app-rewired": "^2.1.8",\n` : ''}${
        !hasRouterDOM ? `"react-router-dom": "^6.0.2",\n` : ''
      }"qiankun": "^2.4.10",`
    );
  insertScriptsIndex &&
    data.splice(
      insertScriptsIndex + 2, // 因为npm依赖插入了两行，所以script需要+2
      0,
      `"micro:start": "react-app-rewired start",\n"micro:build": "react-app-rewired build",`
    );
  fs.writeFileSync(
    path.join(rootName, targetFilePath),
    data.join('\n'),
    'utf8'
  );
};

// 子应用package
const insertSubReactPackageData = (targetFilePath) => {
  let rootName = process.cwd();
  const data = fs
    .readFileSync(path.join(rootName, targetFilePath), 'utf8')
    .split('\n');
  let insertScriptsIndex = 0;
  let insertNpmIndex = 0;
  // const hasQiankun = data.filter((item) => item.includes('react-app-rewired'));
  // if (hasQiankun.length) return;
  data.forEach((item, index) => {
    if (item.includes('"dependencies":')) {
      insertNpmIndex = index;
    }
    // 可能会出现npm里面包含scripts
    if (item.includes('"scripts":')) {
      insertScriptsIndex = index;
    }
  });

  insertNpmIndex &&
    data.splice(insertNpmIndex + 1, 0, `"react-app-rewired": "^2.1.8",`);
  insertScriptsIndex &&
    data.splice(
      insertScriptsIndex + 2, // 因为npm依赖插入了两行，所以script需要+2
      0,
      `"micro:start": "PORT=9999 react-app-rewired start",\n"micro:build": "react-app-rewired build",`
    );
  fs.writeFileSync(
    path.join(rootName, targetFilePath),
    data.join('\n'),
    'utf8'
  );
};

const insertVuePackageData = (targetFilePath) => {
  let rootName = process.cwd();
  const data = fs
    .readFileSync(path.join(rootName, targetFilePath), 'utf8')
    .split('\n');
  let insertNpmIndex = 0;
  let insertScriptsIndex = 0;
  let hasVueRouter = false;
  const hasQiankun = data.filter((item) => item.includes('qiankun'));
  if (hasQiankun.length) return;
  data.forEach((item, index) => {
    if (item.includes('"dependencies":')) {
      insertNpmIndex = index;
    }
    // 可能会出现npm里面包含scripts
    if (item.includes('"scripts":')) {
      insertScriptsIndex = index;
    }
    if (item.includes('"vue-router":')) {
      hasVueRouter = true;
    }
  });

  insertNpmIndex &&
    data.splice(
      insertNpmIndex + 1,
      0,
      `"qiankun": "^2.4.10",${hasVueRouter ? '' : '\n"vue-router": "^3.5.3",'}`
    );
  insertScriptsIndex &&
    data.splice(
      insertScriptsIndex + 2, // 因为npm依赖插入了两行，所以script需要+2
      0,
      `"micro:start": "vue-cli-service serve ./src/microMain.js ",\n"micro:build": "vue-cli-service build ./src/microMain.js",`
    );
  fs.writeFileSync(
    path.join(rootName, targetFilePath),
    data.join('\n'),
    'utf8'
  );
};

const insertSubVueConfig = (targetFilePath) => {
  let rootName = process.cwd();
  try {
    const data = fs
      .readFileSync(path.join(rootName, targetFilePath), 'utf8')
      .split('\n');
    data.splice(
      0,
      0,
      `const { name } = require('./package');
      module.exports = {
        devServer: {
          port: '8888',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
        configureWebpack: {
          entry: {
            app:['./src/microMain.js'], // 入口文件
          },
          output: {
            library: name + '-[name]',
            libraryTarget: 'umd', // 把微应用打包成 umd 库格式
            jsonpFunction: 'webpackJsonp_' + name,
          },
        },
      };
      return;
      // 以上内容是qiankun的基本配置，如果项目中有原有配置，请将上面的配置合并到您的项目中`
    );
    fs.writeFileSync(
      path.join(rootName, targetFilePath),
      data.join('\n'),
      'utf8'
    );
  } catch {
    fs.writeFileSync(
      path.join(rootName, targetFilePath),
      `const { name } = require('./package');
      module.exports = {
        devServer: {
          port: '8888',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
        configureWebpack: {
          entry: {
            app:['./src/microMain.js'], // 入口文件
          },
          output: {
            library: name + '-[name]',
            libraryTarget: 'umd', // 把微应用打包成 umd 库格式
            jsonpFunction: 'webpackJsonp_' + name,
          },
        },
      };
      return;
      // 以上内容是qiankun的基本配置，如果项目中有原有配置，请将上面的配置合并到您的项目中`,
      'utf8'
    );
  }
};

const fsCollection = {
  removeDir,
  createFile,
  insertReactPackageData,
  insertSubReactPackageData,
  // insertVueSrcFileData,
  insertVuePackageData,
  insertSubVueConfig,
};

module.exports = fsCollection;
