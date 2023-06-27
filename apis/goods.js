import request from '@/utils/request.js'

// 请求搜索建议列表
export function getSearchListAPI(params) {
  return request({
    url: 'public/v1/goods/qsearch',
    params
  })
}

// 请求商品列表
export function getGoodsListAPI(params) {
  return request({
    url: 'public/v1/goods/search',
    params
  })
}