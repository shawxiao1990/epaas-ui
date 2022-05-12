import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/epaas/app/list',
    method: 'get',
    params
  })
}
