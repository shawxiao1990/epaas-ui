const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    title: '@sentence(1, 2)',
    'status|1': ['published', 'draft', 'deleted'],
    author: '@sentence(1, 2)',
    description: '@sentence(1, 10)',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/epaas/app/list',
    type: 'get',
    response: config => {
      const items = data.items
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
