import request from '@/utils/request'

export function fetchData(params) {
  return request({
    url: '/v1/server/endpoint',
    method: 'get',
    params
  })
}
export function createServer(data) {
  const post_data = Object.assign({}, data) // copy obj
  post_data.roles = data.roles.join(',')
  console.log(data)
  console.log(post_data)
  return request({
    url: '/v1/server/create',
    method: 'post',
    data: post_data,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
export function updateServer(data) {
  return request({
    url: '/epaas/server/update',
    method: 'post',
    data
  })
}
