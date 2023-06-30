import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/localStorege.js'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = useLocalStorage('user', {})

  // 修改用户信息
  function updateUserInfo(newValue) {
    userInfo.value = newValue
  }

  // 用户地址
  const address = computed(() => {
    return userInfo.value.provinceName + userInfo.value.cityName + userInfo.value.countyName + userInfo.value.detailInfo
  })
  return { userInfo, updateUserInfo, address }
})
