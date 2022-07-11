import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/oauth/token',
    method: 'post',
    data,
    params: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [ // 回调中接收到请求的数据,转为键值对格式
      function(data) {
        const formData = new FormData()
        for (const it in data) {
          formData.append(it, data[it])
        }
        return formData
      }
    ]
  })
}

export function getInfo(token) {
  return request({
    url: '/v1/user',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getAllInfo(token) {
  return request({
    url: '/vue-admin-template/userList/info',
    method: 'get',
    params: { token }
  })
}

export function createUser(token, data) {
  return request({
    url: '/vue-admin-template/user/create',
    method: 'post',
    params: { token },
    data
  })
}
export function updateUser(token, data) {
  return request({
    url: '/vue-admin-template/user/update',
    method: 'post',
    params: { token },
    data
  })
}
