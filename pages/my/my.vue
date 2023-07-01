<script setup>
import { useSetTabBarText } from '@/composables/setTabBarBadge.js'
import { useUserStore } from '@/stores/user.js'

// 修改购物车 tabBar 徽标
useSetTabBarText()

const user = useUserStore()
</script>

<template>
  <!-- 用户未登录 -->
  <my-login v-if="!user.token"></my-login>

  <!-- 用户已登录 -->
  <my-userinfo v-else></my-userinfo>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: white;
}
</style>
