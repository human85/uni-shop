<script setup>
defineProps({
  // 背景颜色
  bgcolor: {
    type: String,
    default: '#c00000'
  },
  // 圆角尺寸
  radius: {
    type: Number,
    default: 18
  }
})

defineEmits(['myClick'])
</script>

<template>
  <view class="my-search-container" :style="{ backgroundColor: bgcolor }" @click="$emit('myClick')">
    <view class="my-search-box" :style="{ borderRadius: radius + 'px' }">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 50px;

  .my-search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    width: 100%;
    height: 36px;
    background-color: #fff;

    .placeholder {
      font-size: 15px;
    }
  }
}
</style>
