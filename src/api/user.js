import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
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
