<template>
  <div id="app">
    <div>
      <div class="nav-list">
        <router-link :class='["nav-item", activeNav==="/micro" ? "active-nav" : ""]'
                     to="/micro">我是基座导航</router-link>
        <router-link :class='["nav-item", activeNav===item.activeRule ? "active-nav" : ""]'
                     :to="item.activeRule"
                     v-for="(item, index) in microAppList"
                     :key="index">
          {{ item.name }}
        </router-link>
      </div>
      <header class="app-header">
        <div>基座内容+业务公共部分</div>
        <div style="font-size: 16px;">
          恭喜💐你！已经成功将您的工程改造成微前端基座项目
        </div>
        <div style="font-size: 16px;">
          后续开发中您只需要在microAppList.js文件中修改您的子应用配置，即可将巨石应用改造为微前端应用了
          <a href="https://qiankun.umijs.org/zh/guide/getting-started#%E4%B8%BB%E5%BA%94%E7%94%A8"
             target="_blank">
            更多内容请查看qiankun文档
          </a>
        </div>
      </header>

      <div id="subapp">子应用内容区</div>
    </div>
  </div>
</template>

<script>
import microAppList from './microAppList'

export default {
  name: 'App',
  data() {
    return {
      microAppList,
      activeNav: '/micro',
    }
  },
  watch: {
    $route(to) {
      this.activeNav = to.path
    },
  },
}
</script>

<style scoped>
#app {
  margin: 0;
  box-sizing: border-box;
  text-align: center;
}
.nav-list {
  height: 5vh;
  line-height: 5vh;
  background-color: #d88;
  text-align: center;
}

.nav-item {
  display: inline-block;
  padding: 0 20px;
  text-decoration: none;
  color: white;
}

.active-nav {
  background: #d66;
}

.app-header {
  height: 10vh;
  font-size: 30px;
  text-align: center;
  background: #dee;
}
</style>
