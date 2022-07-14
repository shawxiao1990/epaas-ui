import request from '@/utils/request'

export function fetchData(params) {
  return request({
    url: '/v1/server/endpoint',
    method: 'get',
    params
  })
}
export function createServer(data) {
  return request({
    url: '/epaas/server/create',
    method: 'post',
    data
  })
}
export function updateServer(data) {
  return request({
    url: '/epaas/server/update',
    method: 'post',
    data
  })
}
