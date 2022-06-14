const Mock = require('mockjs')

const trafficData = Mock.mock({
  items: [{
    id: '@increment',
    'timestamp|+1000': +Mock.Random.date('T'),
    value: {
      upstream: +Mock.Random.integer(0, 100),
      downward: +Mock.Random.integer(0, 100)
    }
  }]
})
const data = Mock.mock({
  item: [
    {
      memMetric: {
        Usage: +Mock.Random.integer(0, 96),
        timestamp: +Mock.Random.date('T'),
        Totle: 96
      }
    },
    {
      cpuMetric: {
        Usage: +Mock.Random.integer(0, 96),
        timestamp: +Mock.Random.date('T'),
        Totle: 96
      }
    }
  ]
})

module.exports = [
  {
    url: '/epaas/server/data',
    type: 'get',
    response: config => {
      // const metricItem = config.query
      const items = data.item
      return {
        code: 20000,
        data: items
      }
    }
  },
  {
    url: '/epaas/server/traffic',
    type: 'get',
    response: config => {
      // const metricItem = config.query
      const items = trafficData.items
      return {
        code: 20000,
        data: items
      }
    }
  }
]
