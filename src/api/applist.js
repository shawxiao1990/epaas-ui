import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/app/list',
    method: 'get',
    params
  })
}
export function createApp(data) {
  return request({
    url: '/v1/app/create',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
export function updateApp(data) {
  return request({
    url: '/v1/app/update',
    method: 'post',
    data
  })
}
