import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/repositories',
    method: 'get',
    params
  })
}
