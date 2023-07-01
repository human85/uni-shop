import request from '@/utils/request.js'

// 创建订单
export function createOrderAPI(data) {
  return request({
    method: 'POST',
    url: 'public/v1/my/orders/create',
    data
  })
}

// 获取支付参数
export function getOrderNumberAPI(order_number) {
  return request({
    method: 'POST',
    url: 'public/v1/my/orders/req_unifiedorder',
    data: { order_number }
  })
}

// 查询支付结果
export function checkOrder(order_number) {
  return request({
    url: 'public/v1/my/orders/chkOrder',
    data: {
      order_number
    }
  })
}
