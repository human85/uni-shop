<script setup>
import { useUserStore } from '@/stores/user.js'

const user = useUserStore()

// 退出登录
async function logOut() {
  const { confirm } = await uni.showModal({ title: '确认退出登录吗？' })
  if (confirm) {
    user.updateAddressInfo({})
    user.updateUserInfo({})
    user.updateToken('')
  }
}
</script>

<template>
  <view class="userinfo-container">
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="user.userInfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{ user.userInfo.nickName }}</view>
    </view>

    <!-- 面板列表区域 -->
    <view class="panel-list">
      <!-- panel one -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>4</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- panel two -->
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon1.png"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon2.png"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon3.png"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon4.png"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- panel three -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logOut">
          <text>退出登录</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.userinfo-container {
  .top-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 400rpx;
    background-color: #c00000;

    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      box-shadow: 1px 1px 5px black;
      border: 2px solid white;
    }

    .nickname {
      font-weight: 700;
      font-size: 16px;
      color: white;
    }
  }

  .panel-list {
    position: relative;
    top: -10px;
    padding: 0 10px;

    .panel {
      background-color: white;
      margin-bottom: 10px;
      font-size: 14px;
      border-radius: 2px;
      box-shadow: 0 1px 5px cornsilk;

      .panel-list-item {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        line-height: 2.5;
        font-size: 14px;

        &:not(:last-child) {
          border-bottom: 1px solid #efefef;
        }
      }

      .panel-title {
        padding-left: 10px;
        border-bottom: 1px solid #efefef;
        line-height: 3.5;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          font-size: 13px;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
