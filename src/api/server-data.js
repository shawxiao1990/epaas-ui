import request from '@/utils/request'

export function fetchData(IP) {
  return request({
    url: '/epaas/server/data',
    method: 'get',
    params: IP
  })
}
export function fetchDataTraffic(IP) {
  return request({
    url: '/epaas/server/traffic',
    method: 'get',
    params: IP
  })
}
