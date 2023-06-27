<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
})
// 默认图片
const defaultPic =
  'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

// 跳转详情页
function goToDetail(id) {
  uni.navigateTo({
    url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
  })
}
</script>

<template>
  <view class="goods-item" @click="goToDetail(goods.goods_id)">
    <view class="goods-item-left">
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-price">&yen;{{ Number(goods.goods_price).toFixed(2) }}</view>
    </view>
  </view>
</template>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      vertical-align: top;
      width: 100px;
      height: 100px;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
