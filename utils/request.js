import axios from 'axios-miniprogram'
import { useUserStore } from '@/stores/user.js'

const request = axios.create({
  baseURL: 'https://api-hmugo-web.itheima.net/api/'
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在请求有权限的 API 接口时在请求头中加上 token
    const user = useUserStore()
    if (config.url.includes('/my/') && user.token) {
      config.headers.Authorization = user.token
    }
    // 在发送请求之前做些什么
    uni.showLoading({
      title: '数据加载中...'
    })
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(520, error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  config => {
    // 2xx 范围的状态码都会触发该函数。
    // 对响应数据做点什么
    uni.hideLoading()
    return config
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    uni.showToast({
      title: '数据请求失败',
      duration: 1500,
      icon: 'error'
    })
    return Promise.reject(error)
  }
)

export default request
