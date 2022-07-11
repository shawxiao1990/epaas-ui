
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/v1/oauth/token',
    type: 'post',
    response: config => {
      const { username } = config.query
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/v1/user\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // get all user info
  {
    url: '/vue-admin-template/userList/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      if (token === tokens.admin.token) {
        return {
          code: 20000,
          data: users
        }
      } else {
        return {
          code: 50008,
          message: 'you have no right to get all user details.'
        }
      }
    }
  },
  {
    url: '/vue-admin-template/user/create\.*',
    type: 'post',
    response: config => {
      const { token } = config.query
      if (token === tokens.admin.token) {
        return {
          code: 20000,
          data: 'success'
        }
      } else {
        return {
          code: 50008,
          message: 'you have no right to create user'
        }
      }
    }
  },
  {
    url: '/vue-admin-template/user/update\.*',
    type: 'post',
    response: config => {
      const { token } = config.query
      if (token === tokens.admin.token) {
        return {
          code: 20000,
          data: 'success'
        }
      } else {
        return {
          code: 50008,
          message: 'you have no right to update user'
        }
      }
    }
  }
]
