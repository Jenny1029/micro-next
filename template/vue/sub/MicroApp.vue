<template>
  <div class="micro-container">
    <div style="font-size: 24px">恭喜💐 你！已经将您的工程改造成微前端子应用啦</div>
    <div style="margin: 0 10%; text-align: left; line-height: 32px">
      <ul>
        <div>接下来请您按照我的步骤来完善您的工程</div>
        <li>1、本项目基于vue-cli配置，在vue.config.js中修改了
          <strong>output</strong>输出文件的格式及
          <strong>devServer</strong>跨域相关配置，<strong>这个是qiankun要求的哦！</strong>所以需要你在后续webpack配置中也添加相应的配置
        </li>
        <li>2、为了避免微前端工程对您原始的入口文件逻辑覆盖，
          我修改了入口文件为microMain.js，
          请参照您的vue-cli的配置修改entry为您项目自己的入口文件，
          并将microMain.js中关于微前端配置的内容复制到您的入口文件中</li>
        <li>3、请按照基座工程中您的配置修改适配的服务端口号</li>
        <div>本项目是基于qiankun微前端应用，
          如果您还关于微前端项目改造方面配置相关的疑问❓可以仔细阅读
          <a href="https://qiankun.umijs.org/zh/guide/getting-started#%E5%BE%AE%E5%BA%94%E7%94%A8"
             target="_blank">这篇文档</a>哟~
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.micro-container {
  text-align: center;
}
</style>