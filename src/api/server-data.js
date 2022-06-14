import request from '@/utils/request'

export function fetchData(params) {
  return request({
    url: '/epaas/server/data',
    method: 'get',
    params
  })
}
export function fetchDataTraffic(params) {
  return request({
    url: '/epaas/server/traffic',
    method: 'get',
    params
  })
}
