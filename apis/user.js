import request from '@/utils/request.js'

export function getTokenAPI(params) {
  return request({
    url: 'public/v1/users/wxlogin',
    params
  })
}
