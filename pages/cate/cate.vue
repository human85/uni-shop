<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getCateListAPI } from '@/apis/cate.js'

// 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
const wh = ref(0)

onLoad(() => {
  const systemInfo = uni.getSystemInfoSync()
  wh.value = systemInfo.windowHeight - 50
})

// 一级分类数据
const cateList = ref([])
// 二级分类数据
const cateLevel2 = ref([])
// 右侧 scroll 滚动条竖向位置
const scrollTop = ref(0)

async function getCateList() {
  const { data } = await getCateListAPI()
  cateList.value = data.message
  cateLevel2.value = data.message[0].children
}

onLoad(() => getCateList())

// 控制当前选中项 默认选中第一项
const activeI = ref(0)

// 分类切换
function changeActive(i) {
  // 设置激活样式
  activeI.value = i
  // 重新设置二级分类
  cateLevel2.value = cateList.value[i].children
  // 重置滚动条位置
  scrollTop.value = 0
}

// 滚动距离同步
function handleScroll(e) {
  scrollTop.value = e.detail.scrollTop
}

// 点击三级分类项跳转到商品列表页面
function goToGoodsList(item3) {
  uni.navigateTo({
    url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
  })
}

// 搜索框点击事件回调
function goToSearch() {
  uni.navigateTo({
    url: '/subpkg/search/search'
  })
}
</script>

<template>
  <my-search @my-click="goToSearch" />
  <view class="scroll-view-container">
    <!-- 左侧滚动视图区域 -->
    <scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
      <view
        v-for="(item, i) in cateList"
        :key="item.cat_id"
        :class="['left-scroll-view-item', { active: activeI === i }]"
        @click="changeActive(i)"
      >
        {{ item.cat_name }}
      </view>
    </scroll-view>
    <!-- 右侧滚动视图区域 -->
    <scroll-view
      class="right-scroll-view"
      scroll-y="true"
      :scroll-top="scrollTop + 'px'"
      :style="{ height: wh + 'px' }"
      @scroll="handleScroll"
    >
      <!-- 二级分类 -->
      <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
        <view class="cate-lv2-title">/ {{ item2.cat_name }} /</view>
        <!-- 三级分类列表 -->
        <view class="cate-lv3-list">
          <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="goToGoodsList(item3)">
            <image :src="item3.cat_icon"></image>
            <text>{{ item3.cat_name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活后样式
      &.active {
        position: relative;
        background-color: #fff;

        &::before {
          position: absolute;
          content: '';
          width: 3px;
          height: 30px;
          background-color: #c00000;
          top: calc(50% - 15px);
          // top: 50%;
          // transform: translateY(-50%);
          left: 0;
        }
      }
    }
  }

  .right-scroll-view {
    background-color: #fff;

    .cate-lv2-title {
      padding: 15px 0;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;
      row-gap: 10px;

      .cate-lv3-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% / 3);

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
