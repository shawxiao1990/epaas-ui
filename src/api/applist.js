import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/epaas/app/list',
    method: 'get',
    params
  })
}
export function createApp(data) {
  return request({
    url: '/epaas/app/create',
    method: 'post',
    data
  })
}
export function updateApp(data) {
  return request({
    url: '/epaas/app/update',
    method: 'post',
    data
  })
}
