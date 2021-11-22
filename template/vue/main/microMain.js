import Vue from 'vue';
import MicroApp from './MicroApp.vue';
import VueRouter from 'vue-router';
import { registerMicroApps, start } from 'qiankun';
import microAppList from './microAppList';

const router = new VueRouter({
  mode: 'history',
});

Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(MicroApp),
}).$mount('#app');

registerMicroApps(microAppList);
start();
