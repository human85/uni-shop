import { ref, watch } from 'vue'

// 实现本地存储
export function useLocalStorage(key, initialValue) {
  const value = ref(initialValue)
  if (uni.getStorageSync(key)) {
    value.value = uni.getStorageSync(key)
  }
  // ref 默认为浅层监听
  watch(
    value,
    newValue => {
      uni.setStorageSync(key, newValue)
    },
    { deep: true }
  )

  return value
}

// 此方式只有直接修改值时才能触发 set
/* export function useLocalStorage(key, initiaValue) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return uni.getStorageSync(key) || initiaValue
      },
      set(newValue) {
        uni.setStorageSync(key, newValue)
        trigger()
      }
    }
  })
} */
