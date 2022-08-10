const Mock = require('mockjs')

const data = Mock.mock({
  'items|1000': [{
    id: '@id',
    registry: 'harbor.emotibot.com',
    'repo|1': [
      'aaaa',
      'bbbb',
      'cccc',
      'dddd',
      /[a-z]{4}/
    ],
    'imagename|1': [
      /[a-z]{5}/,
      'bingjun'
    ],
    imagetag: /[0-9]{5}/
  }],
  'items2|1': [{
    id: '@id',
    registry: 'harbor.emotibot.com',
    'repo|1': [
      'aaaa',
      'bbbb',
      'cccc',
      'dddd',
      /[a-z]{4}/
    ],
    'imagename|1': [
      'xiaobingjun'
    ],
    imagetag: /[0-9]{5}/
  }]
})

module.exports = [
  {
    url: '/repositories',
    type: 'get',
    response: config => {
      const items = data.items.concat(data.items2)
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
