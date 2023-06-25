import request from '@/utils/request.js'

export function getCateListAPI() {
  return request({
    url: 'public/v1/categories'
  })
}