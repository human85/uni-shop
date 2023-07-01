<script setup>
import { useCartStore } from '@/stores/cart.js'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { createOrderAPI, getOrderNumberAPI, checkOrder } from '@/apis/pay.js'

const { cartList, selectedCount, selectedTotalPrice, allSelected } = storeToRefs(useCartStore())
const { updateAllGoodsState } = useCartStore()
const user = useUserStore()
let timer = null // 定时器

// 点击结算的回调
async function settlement() {
  // 是否选择商品
  if (!selectedCount.value) {
    uni.showToast({
      title: '请选择商品😀',
      icon: 'none'
    })
    return
  }
  // 是否添加收货地址
  if (!user.address) {
    uni.showToast({
      title: '请添加收货地址表情😘',
      icon: 'none'
    })
  }
  // 是否登录
  if (!user.token) {
    let second = 3

    uni.showToast({
      title: `您还没有登录😅，${second}秒后将跳转至登录页`,
      icon: 'none',
      mask: true
    })

    timer = setInterval(() => {
      second--
      uni.showToast({
        title: `您还没有登录😅，${second}秒后将跳转至登录页`,
        icon: 'none',
        mask: true
      })

      if (second <= 0) {
        clearInterval(timer)
        uni.switchTab({
          url: '/pages/my/my',
          success: () => {
            user.updateRedirectInfo({ openType: 'switchTab', from: '/pages/cart/cart' })
          }
        })
      }
    }, 1000)
  }

  // 创建订单
  const queryObj = {
    // order_price: selectedTotalPrice.value,
    // 开发期间，注释掉真实的订单价格，
    order_price: 0.01,
    consignee_addr: user.address,
    goods: cartList.value
      .filter(item => item.goods_state)
      .map(item => ({ goods_id: item.goods_id, goods_number: item.goods_count, goods_price: item.goods_price }))
  }
  const { data } = await createOrderAPI(queryObj)
  // console.log(data)
  if (data.meta.status !== 200) {
    uni.showToast({
      icon: 'error',
      title: data.meta.msg
    })
    return
  }
  // 获取支付参数
  const { data: res } = await getOrderNumberAPI(data.message.order_number)

  // 发起微信支付
  try {
    await uni.requestPayment(res.message.pay)
    // 进一步查询支付结果
    const { data: result } = await checkOrder(data.message.order_number)
    if (result.meta.status !== 200) {
      uni.showToast({
        icon: 'none',
        title: '订单未支付！😣'
      })
    }
    uni.showToast({
      icon: 'none',
      title: '支付成功😘'
    })
  } catch (e) {
    return uni.showToast({
      icon: 'none',
      title: '订单未支付！😣'
    })
  }
}
</script>

<template>
  <view class="my-settle-container">
    <label class="radio" @click="updateAllGoodsState(!allSelected)">
      <!-- 全选区域 -->
      <radio :checked="allSelected" color="#c00000" />
      <text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计：
      <text class="amount">&yen;{{ selectedTotalPrice }}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="settle-btn" @click="settlement">结算({{ selectedCount }})</view>
  </view>
</template>
<style lang="scss">
.my-settle-container {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .settle-btn {
    width: 100px;
    height: 50px;
    background-color: #c00000;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
}
</style>
