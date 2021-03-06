// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
//引入插件
import axios from 'axios'
//将插件绑定到Vue构造函数的原型中
Vue.prototype.axios=axios;
// 导入vuex模块
import Vuex from 'vuex'
 // 安装模块
Vue.use(Vuex);
import store from './assets/js/vuex.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  router,
  store
})
