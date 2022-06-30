const Mock = require('mockjs')

const trafficData = Mock.mock({
  '192.168.1.2': [{
    id: '@increment',
    'timestamp|+1000': +Mock.Random.date('T'),
    value: {
      upstream: +Mock.Random.integer(0, 100),
      downward: +Mock.Random.integer(0, 100)
    }
  }]
})
const data = Mock.mock({
  '192.168.1.2': [
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
      const { IP } = config.query
      const items = data[IP]
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
      const { IP } = config.query
      const items = trafficData[IP]
      return {
        code: 20000,
        data: items
      }
    }
  }
]
