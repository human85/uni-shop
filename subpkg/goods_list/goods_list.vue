<script setup>
import { reactive, ref } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { getGoodsListAPI } from '@/apis/goods.js'

const params = reactive({ query: '', cid: '', pagenum: 1, pagesize: 10 }) // 商品列表请求参数
const goodsList = ref([]) // 商品列表
const total = ref(0) // 商品总数 实现分页
const isLoading = ref(false) // 下拉触底节流阀

async function getGoodsList(cb) {
  isLoading.value = true // 开启节流阀
  const { data } = await getGoodsListAPI(params)
  // 数据请求完毕关闭下拉刷新
  cb && cb()
  goodsList.value = [...goodsList.value, ...data.message.goods]
  total.value = data.message.total
  isLoading.value = false // 关闭节流阀
}

onLoad(option => {
  params.query = option.query || ''
  params.cid = option.cid || ''
  getGoodsList()
})

// 下拉触底事件
onReachBottom(() => {
  if (params.pagenum * params.pagesize >= total.value) {
    uni.showToast({
      title: '数据加载完毕！'
    })
    return
  }
  if (isLoading.value) return
  params.pagenum++
  getGoodsList()
})

// 下拉刷新事件
onPullDownRefresh(() => {
  params.pagenum = 1
  isLoading.value = false
  goodsList.value = []
  getGoodsList(() => uni.stopPullDownRefresh())
})
</script>

<template>
  <view class="goods-list">
    <my-goods v-for="goods in goodsList" :key="goods.goods_id" :goods="goods"></my-goods>
  </view>
</template>

<style lang="scss"></style>
