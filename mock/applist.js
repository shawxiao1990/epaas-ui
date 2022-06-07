const Mock = require('mockjs')

const data = Mock.mock({
  'items|65': [{
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    title: '@title(5, 10)',
    'status|1': ['published', 'draft'],
    'author|1': [
      '@first',
      'bingjunx',
      'Super Admin',
      'Normal Editor'
    ],
    reviewer: '@first',
    description: '@sentence(1, 10)',
    display_time: '@datetime',
    'docker_images|2': [/harbor\.emotibot\.com\/[a-z]{4}\/[a-z]{5}:[0-9]{5}/]
  }]
})

module.exports = [
  {
    url: '/epaas/app/list',
    type: 'get',
    response: config => {
      const { title, sort, page, limit, author } = config.query
      // filter by title
      let items = data.items.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      if (author !== '') items = items.filter((item, index) => item.author === author)
      if (sort === '-id') {
        items = items.reverse()
      }
      const pageList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/epaas/app/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/epaas/app/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
