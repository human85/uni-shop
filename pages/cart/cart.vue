<script setup>
import { useSetTabBarText } from '@/composables/setTabBarBadge.js'
import { useCartStore } from '@/stores/cart.js'

// 修改购物车 tabBar 徽标
useSetTabBarText()

// 购物车数据
const cart = useCartStore()

const options = [
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  }
]
</script>

<template>
  <!-- 收货地址 -->
  <view class="cart-container" v-if="cart.cartList.length">
    <my-adress></my-adress>

    <view class="cart-title">
      <uni-icons type="shop" size="21"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表 -->
    <uni-swipe-action>
      <uni-swipe-action-item
        :right-options="options"
        v-for="goods in cart.cartList"
        :key="goods.goods_id"
        @click="cart.removeGoods(goods.goods_id)"
      >
        <my-goods
          :goods="goods"
          :showRadio="true"
          :showNumberBox="true"
          @radio-change="id => cart.changeState(id)"
          @number-change="({ id, count }) => cart.changeCount({ id, count })"
        ></my-goods>
      </uni-swipe-action-item>
    </uni-swipe-action>

    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>

  <!-- 空白购物车区域-->
  <view class="empty-cart" v-else>
    <image src="@/static/cart_empty@2x.png"></image>
    <text>空空如也</text>
  </view>
</template>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;

  .cart-title {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 5px;
    gap: 10px;
    border-bottom: 1px solid #efefef;
    font-size: 14px;
    line-height: 1;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding-top: 300rpx;
  font-size: 12px;
  color: gary;

  image {
    width: 90px;
    height: 90px;
  }
}
</style>
