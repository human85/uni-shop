<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getSwiperListAPI, getNavListAPI, getFloorListAPI } from '@/apis/home.js'

// 搜索框点击事件回调
function goToSearch() {
  uni.navigateTo({
    url: '/subpkg/search/search'
  })
}

// 获取轮播图数据
const swiperList = ref([])

async function getSwiperList() {
  const { data } = await getSwiperListAPI()
  swiperList.value = data.message
}

onLoad(() => getSwiperList())

// 获取导航栏数据
const navList = ref([])

async function getNavList() {
  const { data } = await getNavListAPI()
  navList.value = data.message
}

onLoad(() => getNavList())

// 导航栏点击跳转
function navClickHandler(item) {
  if (item.name === '分类') {
    uni.switchTab({
      url: '/pages/cate/cate'
    })
  }
}

// 获取楼层列表数据
const floorList = ref([])

async function getFloorList() {
  const { data } = await getFloorListAPI()
  floorList.value = data.message
  data.message.forEach(item => {
    item.product_list.forEach(product => {
      product.url = '/subpkg/goods_list/goods_list?' + product.navigator_url.split('?')[1]
    })
  })
}

onLoad(() => getFloorList())
</script>

<template>
  <!-- 吸顶搜索框 -->
  <view class="search-box">
    <my-search @my-click="goToSearch" />
  </view>
  <!-- 轮播图区域 -->
  <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
    <swiper-item v-for="(item, i) in swiperList" :key="i">
      <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
        <image :src="item.image_src"></image>
      </navigator>
    </swiper-item>
  </swiper>

  <!-- 导航栏区域 -->
  <view class="nav-list">
    <view @click="navClickHandler(item)" class="nav-item" v-for="(item, i) in navList" :key="i">
      <image class="nav-img" :src="item.image_src"></image>
    </view>
  </view>

  <!-- 楼层列表区域 -->
  <view class="floor-list">
    <!-- 楼层 item 项 -->
    <view class="floor-item" v-for="(item, i) in floorList" :key="i">
      <!-- 楼层标题 -->
      <image class="floor-title" :src="item.floor_title.image_src"></image>
      <!-- 楼层图片区域 -->
      <view class="floor-img-box">
        <!-- 左侧大图 -->
        <navigator class="left-img-box" :url="item.product_list[0].url">
          <image
            :src="item.product_list[0].image_src"
            :style="{ width: item.product_list[0].image_width + 'rpx' }"
            mode="widthFix"
          ></image>
        </navigator>
        <!-- 右侧小图 -->
        <view class="right-img-box">
          <navigator v-for="product in item.product_list.slice(1)" :key="product.name" :url="product.url">
            <image :src="product.image_src" mode="widthFix" :style="{ width: product.image_width + 'rpx' }"></image>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.search-box {
  position: sticky; // 吸顶效果
  top: 0;
  z-index: 999; // 提高层级 防止被轮播图覆盖
}

swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  height: 60rpx;
  width: 100%;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
