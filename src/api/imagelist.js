import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/epaas/image/list',
    method: 'get',
    params
  })
}
