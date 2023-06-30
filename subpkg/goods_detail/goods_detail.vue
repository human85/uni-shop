<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { getGoodsInfoAPI } from '@/apis/goods.js'
import { ref, watch } from 'vue'
import { useCartStore } from '@/stores/cart.js'
const cart = useCartStore()

// 获取商品详情数据
const goodsInfo = ref({})

async function getGoodsInfo(goods_id) {
  const { data } = await getGoodsInfoAPI(goods_id)
  // 修改富文本中 img 标签样式解决图片间隙问题
  // 解决 .webp 格式图片在 ios 设备上无法正常显示的问题
  data.message.goods_introduce = data.message.goods_introduce
    .replace(/<img /g, '<img style="display: block;" ')
    .replace(/webp/g, 'jpg')
  goodsInfo.value = data.message
}

onLoad(option => {
  getGoodsInfo(option.goods_id)
})

// 预览轮播图
function previewImage(i) {
  uni.previewImage({
    urls: goodsInfo.value.pics.map(pic => pic.pics_big),
    current: i,
    loop: true
  })
}

// 商品导航组件数据
const options = ref([
  {
    icon: 'shop',
    text: '店铺'
  },
  {
    icon: 'cart',
    text: '购物车',
    info: 0
  }
])
// 监听 store 中商品总数变化
watch(
  () => cart.total,
  newVal => {
    const obj = options.value.find(item => item.text === '购物车')
    obj.info = newVal
  },
  { immediate: true }
)

const buttonGroup = [
  {
    text: '加入购物车',
    backgroundColor: '#ff0000',
    color: '#fff'
  },
  {
    text: '立即购买',
    backgroundColor: '#ffa200',
    color: '#fff'
  }
]

// 左侧点击事件
function onClick(e) {
  if (e.content.text === '购物车') {
    uni.switchTab({
      url: '/pages/cart/cart'
    })
  }
}

// 右侧点击事件
function buttonClick(e) {
  if (e.content.text === '加入购物车') {
    const goods = {
      goods_id: goodsInfo.value.goods_id, // 商品的Id
      goods_name: goodsInfo.value.goods_name, // 商品的名称
      goods_price: goodsInfo.value.goods_price, // 商品的价格
      goods_count: 1, // 商品的数量
      goods_small_logo: goodsInfo.value.goods_small_logo, // 商品的图片
      goods_state: true // 商品的勾选状态
    }
    cart.addToCart(goods)
  }
}
</script>

<template>
  <view class="goods-detail-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(pics, i) in goodsInfo.pics" :key="pics.pics_id">
        <image @click="previewImage(i)" :src="pics.pics_big" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="price">&yen;{{ goodsInfo.goods_price?.toFixed(2) }}</view>
      <!-- 主体 -->
      <view class="goods-info-body">
        <view class="goods-name">{{ goodsInfo.goods_name }}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 邮费 -->
      <view class="postage">快递：免运费</view>
    </view>

    <!-- 商品详情信息 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>

    <!-- 商品导航 -->
    <uni-goods-nav
      class="goods-nav"
      :fill="true"
      :options="options"
      :buttonGroup="buttonGroup"
      @click="onClick"
      @buttonClick="buttonClick"
    />
  </view>
</template>

<style lang="scss">
.goods-detail-container {
  padding-bottom: 50px;

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;

    .price {
      font-size: 18px;
      color: #c00000;
      line-height: 2;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        padding-right: 10px;
        font-size: 13px;
      }

      .favi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120px;
        border-left: 1px solid #efefef;
        font-size: 12px;
      }
    }

    .postage {
      margin: 10px 0;
      font-size: 12px;
      color: gary;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
