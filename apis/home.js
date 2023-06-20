import request from '@/utils/request.js'

// 请求轮播图数据
export function getSwiperListAPI() {
  return request({
    url: 'public/v1/home/swiperdata'
  })
}

// 请求导航栏数据
export function getNavListAPI() {
  return request({
    url: 'public/v1/home/catitems'
  })
}

// 请求楼层列表数据
export function getFloorListAPI() {
  return request({
    url: 'public/v1/home/floordata'
  })
}