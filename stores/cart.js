import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/composables/localStorege.js'

export const useCartStore = defineStore('cart', () => {
  // 购物车的数组，用来存储购物车中每个商品的信息对象
  // 每个商品的信息对象，都包含如下 6 个属性：
  // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
  const cartList = useLocalStorage('cart', [])

  // 加入购物车
  function addToCart(goods) {
    const product = cartList.value.find(item => item.goods_id === goods.goods_id)
    if (product) {
      product.goods_count++
    } else {
      cartList.value = [...cartList.value, goods]
    }
  }

  // 修改商品选中状态
  function changeState(id) {
    const goods = cartList.value.find(item => item.goods_id === id)
    goods.goods_state = !goods.goods_state
  }

  // 修改商品数量
  function changeCount({ id, count }) {
    const goods = cartList.value.find(item => item.goods_id === id)
    goods.goods_count = count
  }

  // 移除商品
  function removeGoods(id) {
    cartList.value = cartList.value.filter(item => item.goods_id !== id)
  }

  // 商品总数
  const total = computed(() => {
    return cartList.value.reduce((p, c) => p + c.goods_count, 0)
  })

  // 已选中商品数量
  const selectedCount = computed(() => {
    return cartList.value.filter(item => item.goods_state).reduce((p, c) => p + c.goods_count, 0)
  })

  // 已选商品的总价格
  const selectedTotalPrice = computed(() => {
    return cartList.value
      .filter(item => item.goods_state)
      .reduce((p, c) => p + c.goods_count * c.goods_price, 0)
      .toFixed(2)
  })

  // 全选框状态
  const allSelected = computed(() => {
    // return cartList.value.every(item => item.goods_state)
    return selectedCount.value === total.value
  })

  // 更新所有商品选中状态
  function updateAllGoodsState(newState) {
    cartList.value.forEach(item => (item.goods_state = newState))
  }

  return {
    cartList,
    addToCart,
    total,
    changeState,
    changeCount,
    removeGoods,
    selectedCount,
    selectedTotalPrice,
    allSelected,
    updateAllGoodsState
  }
})
