import { onShow, onHide } from '@dcloudio/uni-app'
import { useCartStore } from '@/stores/cart.js'
import { watch } from 'vue'

// onLoad方法在页面初始加载时触发，但当用户返回到该页面时可能不会再次触发。而onShow方法在每次页面显示时都会被调用，包括页面首次加载和用户返回到该页面。

// 由于希望在页面显示时更新购物车徽标，最好在onShow方法中调用setCartBadge函数。这样可以确保购物车徽标始终是最新的，无论用户何时返回到该页面。

export function useSetTabBarText() {
  const cart = useCartStore()
  // tabBar 页面不会在切换后卸载 通过 stopWatch 变量控制在非 tabBar 页面不执行侦听器的内部逻辑操作
  let stopWatch = false

  watch(
    () => cart.total,
    newValue => {
      if (stopWatch || newValue === 0) return
      uni.setTabBarBadge({
        index: 2,
        text: newValue.toString()
      })
    },
    { immediate: true }
  )

  onShow(() => (stopWatch = false))
  onHide(() => (stopWatch = true))
}
