<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getSearchListAPI } from '@/apis/goods.js'
const keyword = ref('') // 关键词
let params = { query: '' } // 搜索列表请求参数
let timer = null // 定时器
const searchList = ref([]) // 搜索结果
const historyList = ref([]) // 关键词历史记录
// 实际展示的关键词历史记录
// 深拷贝后再反转数组 防止修改原数组顺序
const histories = computed(() => [...historyList.value].reverse())
// 保存搜索关键词到历史记录的函数
function saveKeyword() {
  // Set 对象允许存储任何类型的唯一值
  const historySet = new Set(historyList.value)
  historySet.add(keyword.value)
  // 将 Set 对象转化为数组
  historyList.value = Array.from(historySet)
  // 将搜索记录持久化存储到本地(uni-app会自动将数据转换成 JSON 字符串)
  uni.setStorageSync('keyword', historyList.value)
}
// 页面加载读取本地存储的历史记录
onLoad(() => {
  historyList.value = uni.getStorageSync('keyword') || []
})
// 清除搜索历史记录
function clearHistory() {
  historyList.value = []
  uni.removeStorageSync('keyword')
}
// 获取搜索列表的函数
async function getSearchList() {
  // 防止在关键字后输入空格时重复发送网络请求
  if (params.query === keyword.value) return
  params.query = keyword.value
  if (keyword.value === '') {
    searchList.value = []
    return
  }
  const { data } = await getSearchListAPI(params)
  searchList.value = data.message
  saveKeyword()
}
// input 输入的回调
function inputHandler() {
  timer || clearTimeout(timer)
  timer = setTimeout(() => {
    // 获取搜索列表
    getSearchList()
  }, 1000)
}
// 点击跳转详情页
function goToDetail(id) {
  uni.navigateTo({
    url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
  })
}
// 跳转商品列表页面(搜索栏回车或点击搜索历史关键词触发)
function goToGoodsList(item) {
  // input 事件中 item 为对象 点击事件中 item 为字符串
  if (typeof item === 'object') item = item.value.trim()
  if (!item) {
    uni.showToast({
      title: '内容不能为空',
      icon: 'error'
    })
    keyword.value = ' '
    return
  }
  uni.navigateTo({
    url: '/subpkg/goods_list/goods_list?query=' + item
  })
}
</script>

<template>
  <view class="search-box">
    <uni-search-bar
      v-model.trim="keyword"
      @confirm="goToGoodsList"
      @input="inputHandler"
      cancel-button="none"
      :radius="100"
      :focus="true"
    ></uni-search-bar>
  </view>
  <!-- 搜索建议列表 -->
  <view class="suggest-list" v-if="searchList.length !== 0">
    <view class="suggest-item" v-for="item in searchList" :key="item.goods_id" @click="goToDetail(item.goods_id)">
      <view class="goods-name">{{ item.goods_name }}</view>
      <uni-icons type="right" :size="16"></uni-icons>
    </view>
  </view>
  <!-- 搜索历史 -->
  <view class="history-box" v-else>
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons @click="clearHistory" type="trash" size="17"></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag
        @click="goToGoodsList(item)"
        :inverted="true"
        type="primary"
        :text="item"
        v-for="(item, i) in histories"
        :key="i"
      ></uni-tag>
    </view>
  </view>
</template>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #c00000;
}

.suggest-list {
  padding: 0 5px;

  .suggest-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid #adadad;
    font-size: 12px;

    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    border-bottom: 1px solid #adadad;
    font-size: 13px;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 5px;
    padding-top: 5px;
  }
}
</style>
