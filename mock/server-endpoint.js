const Mock = require('mockjs')

const endpoint = Mock.mock({
  items: {
    'test1': {
      id: '@increment',
      path: 'test1',
      serverList: {
        server1: '192.168.1.1',
        server2: '192.168.1.2'
      }
    },
    'test2': {
      id: '@increment',
      path: 'test2',
      serverList: {
        server3: '192.168.2.1',
        server4: '192.168.2.2'
      }
    }
  }
})
console.log(endpoint.items)
module.exports = [
  {
    url: '/epaas/server/endpoint',
    type: 'get',
    response: config => {
      const items = endpoint.items
      return {
        code: 20000,
        data: items
      }
    }
  }
]
