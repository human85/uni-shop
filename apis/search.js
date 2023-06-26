import request from '@/utils/request.js'

// 请求搜索列表
export function getSearchListAPI(params) {
  return request({
    url: 'public/v1/goods/qsearch',
    params
  })
}