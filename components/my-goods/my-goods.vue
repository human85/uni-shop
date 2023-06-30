<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => {}
  },
  showRadio: {
    type: Boolean,
    default: false
  },
  showNumberBox: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click', 'radioChange', 'numberChange'])
// 默认图片
const defaultPic =
  'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
</script>

<template>
  <view class="goods-item" @click="$emit('click', goods.goods_id)">
    <view class="goods-item-left">
      <!-- 单选框 -->
      <radio
        color="#C00000"
        :checked="goods.goods_state"
        v-if="showRadio"
        @click="$emit('radioChange', goods.goods_id)"
      />
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <view class="goods-price">&yen;{{ Number(goods.goods_price).toFixed(2) }}</view>
        <uni-number-box
          v-if="showNumberBox"
          :value="goods.goods_count"
          :min="1"
          :max="99"
          @change="newValue => $emit('numberChange', { id: goods.goods_id, count: newValue })"
        ></uni-number-box>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    display: flex;
    align-items: center;
    margin-right: 5px;

    .goods-pic {
      vertical-align: top;
      width: 100px;
      height: 100px;
    }
  }

  .goods-item-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
}
</style>
