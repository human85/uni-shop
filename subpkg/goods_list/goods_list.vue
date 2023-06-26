<template>
  <view>{{ a }}</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const a = ref('')
onLoad(option => (a.value = option.query))
</script>

<style lang="scss"></style>
