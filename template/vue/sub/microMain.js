import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import MicroApp from './MicroApp';

Vue.config.productionTip = false;

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    /* 路由前缀，跳转不需要添加，只管后面的地址就行；
    base前缀和基座activeRule保持一致 */
    base: window.__POWERED_BY_QIANKUN__ ? '/micro/subvue/' : '/',
    mode: 'history',
  });

  instance = new Vue({
    router,
    // store,
    render: (h) => h(container ? MicroApp : App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
