// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api'

// 请求拦截器
$http.beforeRequest = () => {
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截器
$http.afterRequest = () => {
  uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif