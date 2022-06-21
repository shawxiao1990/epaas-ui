const Mock = require('mockjs')

const endpoint = Mock.mock({
  items: [{
    id: '@increment',
    path: 'test1',
    serverList: {
      server1: +Mock.Random.integer(0, 100),
      server2: +Mock.Random.integer(0, 100)
    }
  },
  {
    id: '@increment',
    path: 'test2',
    serverList: {
      server1: +Mock.Random.integer(0, 100),
      server2: +Mock.Random.integer(0, 100)
    }
  }
  ]
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
