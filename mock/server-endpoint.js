const Mock = require('mockjs')
const List = []
const count = 100
for (let i = 0; i < count; i++) {
  const endpoint = 'test' + i + '1'
  const servername1 = 'server' + i + '1'
  const servername2 = 'server' + i + '2'
  List.push(Mock.mock({
    [endpoint]: {
      id: '@increment',
      path: endpoint,
      roles: [],
      serverList: {
        [servername1]: /[1-9]{3}\.[1-9]{3}\.[1-9]{3}\.[1-9]{3}/,
        [servername2]: /[1-9]{3}\.[1-9]{3}\.[1-9]{3}\.[1-9]{3}/
      },
      roleList: {
        [servername1]: ['admin'],
        [servername2]: ['admin']
      }
    }

  })
  )
}
const endpoint = Mock.mock({
  items: {
    'test1': {
      id: '@increment',
      path: 'test1',
      roles: ['admin'],
      serverList: {
        server1: '192.168.1.1',
        server2: '192.168.1.2'
      },
      roleList: {
        server1: ['admin'],
        server2: ['admin']
      }
    },
    'test2': {
      id: '@increment',
      path: 'test2',
      roles: ['admin'],
      serverList: {
        server3: '192.168.2.1',
        server4: '192.168.2.2'
      },
      roleList: {
        server3: ['admin'],
        server4: ['admin']
      }
    }
  }
})
module.exports = [
  {
    url: '/epaas/server/endpoint',
    type: 'get',
    response: config => {
      const items = endpoint.items
      List.forEach(item => {
        items[Object.keys(item)[0]] = item[Object.keys(item)[0]]
      })
      return {
        code: 20000,
        data: items
      }
    }
  }
]
