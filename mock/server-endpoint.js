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
      path: /[a-z]{5}/,
      serverList: {
        [servername1]: /[1-9]{3}\.[1-9]{3}\.[1-9]{3}\.[1-9]{3}/,
        [servername2]: /[1-9]{3}\.[1-9]{3}\.[1-9]{3}\.[1-9]{3}/
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
