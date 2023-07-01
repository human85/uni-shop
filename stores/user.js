import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/localStorege.js'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户地址信息
  const adressInfo = useLocalStorage('adressInfo', {})

  // 修改用户地址信息
  function updateAddressInfo(newValue) {
    adressInfo.value = newValue
  }

  // 用户地址
  const address = computed(() => {
    return (
      adressInfo.value.provinceName +
      adressInfo.value.cityName +
      adressInfo.value.countyName +
      adressInfo.value.detailInfo
    )
  })

  // token
  const token = useLocalStorage('token', '')
  // 用户信息
  const userInfo = useLocalStorage('userInfo', {})

  // 更新用户信息
  function updateUserInfo(newValue) {
    userInfo.value = newValue
  }

  // 更新 token
  function updateToken(newValue) {
    token.value = newValue
  }

  // 重定向的信息对象
  const redirectInfo = ref(null)

  // 更新重定向信息的方法
  function updateRedirectInfo(newValue) {
    redirectInfo.value = newValue
  }

  return {
    adressInfo,
    updateAddressInfo,
    address,
    token,
    userInfo,
    updateUserInfo,
    updateToken,
    redirectInfo,
    updateRedirectInfo
  }
})
