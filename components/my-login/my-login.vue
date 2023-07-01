<script setup>
import { useUserStore } from '@/stores/user.js'
import { getTokenAPI } from '@/apis/user.js'

const user = useUserStore()

// 获取用户信息
async function getUserProfile() {
  const res = await uni.getUserProfile({ desc: '用于用户登录' })
  if (res.errMsg === 'getUserInfo:fail auth deny') {
    uni.showToast({
      title: '您取消了登录授权！',
      icon: 'none'
    })
    return
  }
  // 更新用户信息到 pinia
  user.updateUserInfo(res.userInfo)
  // 登录并获取 token
  getToken(res.userInfo)
  if (user.redirectInfo && user.redirectInfo.openType === 'switchTab') {
    uni.switchTab({
      url: user.redirectInfo.from,
      complete: () => {
        user.updateRedirectInfo(null)
      }
    })
  }
}

// 登录获取 token 的方法
async function getToken(info) {
  const { code } = await uni.login()
  // 登录参数对象
  const querry = {
    code: code,
    encryptedData: info.encryptedData,
    iv: info.iv,
    rawData: info.rawData,
    signature: info.signature
  }
  // 调用登陆API
  const TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
  const { data } = await getTokenAPI(querry)

  if (data.message) {
    user.updateToken(data.message.token)
  } else {
    user.updateToken(TOKEN)
  }
}
</script>

<template>
  <view class="login-container">
    <uni-icons type="contact" size="100" color="#afafaf"></uni-icons>
    <button class="login-btn" type="primary" @click="getUserProfile">一键登录</button>
    <text class="tips-text">登陆后尽享更多权益</text>
  </view>
</template>

<style lang="scss">
.login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 750rpx;
  background-color: #f8f8f8;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -20px;
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 100%;
  }

  .login-btn {
    margin: 15px 0;
    width: 90%;
    border-radius: 100px;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
