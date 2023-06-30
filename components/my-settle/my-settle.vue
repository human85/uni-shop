<script setup>
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'

const { selectedCount, selectedTotalPrice, allSelected } = storeToRefs(useCartStore())
const { updateAllGoodsState } = useCartStore()
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
    <view class="settle-btn">结算({{ selectedCount }})</view>
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
