<script setup>
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'

const { userInfo, address } = storeToRefs(useUserStore())
const { updateUserInfo } = useUserStore()

// 选择收货地址
async function chooseAddress() {
  try {
    const response = await uni.chooseAddress()
    // 用户选择地址并确认
    if (response.errMsg === 'chooseAddress:ok') {
      updateUserInfo(response)
    }
  } catch (e) {
    // 未授权
    if (e.errMsg === ('chooseAddress:fail auth deny' || 'chooseAddress:fail authorize no response')) {
      // 重新授权
      reAuth()
    }
  }
}

// 重新授权的方法
async function reAuth() {
  const { confirm, cancel } = await uni.showModal({
    content: '检测到您没打开地址权限，是否去设置打开？',
    confirmText: '确认',
    cancelText: '取消'
  })

  if (cancel) {
    uni.showToast({
      title: '您取消了地址授权！'
    })
  }

  if (confirm) {
    uni.openSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          uni.showToast({
            title: '授权成功！请选择地址'
          })
        } else {
          uni.showToast({
            title: '您取消了地址授权!'
          })
        }
      }
    })
  }
}
</script>

<template>
  <view class="address-container">
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="!userInfo.userName">
      <button type="primary" size="mini" class="addressChooseBtn" @click="chooseAddress">选择收货地址</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="addreess-info-box" @click="chooseAddress" v-else>
      <view class="row1">
        <view class="username">收货人：{{ userInfo.userName }}</view>
        <view class="phone">
          电话：{{ userInfo.telNumber }}
          <uni-icons class="arrowright" type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ address }}</view>
      </view>
    </view>
    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<style lang="scss">
.address-container {
  padding: 0 5px;

  .address-choose-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }

  .addreess-info-box {
    height: 90px;
    font-size: 12px;

    .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;

      .arrowright {
        vertical-align: middle;
      }
    }

    .row2 {
      display: flex;

      .row2-left {
        flex: 0 0 auto;
      }

      .row2-right {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }
}
</style>
