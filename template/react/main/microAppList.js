let microAppList = [
  {
    name: 'subreact', // apppName 需要和子系统wepack配置的library对应
    entry: '//localhost:9999', // 微应用单独访问的url地址，上线以后需要切换成子应用线上单独访问的url路径
    activeRule: '/micro/subreact', // 触发路由
    props: {}, // 自定义属性
  },
  {
    name: 'subvue',
    entry: '//localhost:8888',
    activeRule: '/micro/subvue',
    props: {},
  },
];

// 子应用支持远端调试
// 获取url参数
const params = new URL(window.location.href).searchParams;
params.get('name') &&
  params.get('entry') &&
  params.get('activeRule') &&
  microAppList.push({
    name: params.get('name'),
    entry: params.get('entry'),
    activeRule: params.get('activeRule'),
    props: {},
  });

microAppList = microAppList.map((item) => {
  return Object.assign(
    {
      container: '#subapp', // 存放子应用的DOM容器
    },
    item
  );
});

console.log(microAppList);

export default microAppList;
