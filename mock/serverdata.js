const Mock = require('mockjs')

const memoryData = []
const count = 100

for (let i = 0; i < count; i++) {
  memoryData.push(Mock.mock({
    id: '@increment',
    item: 'memory',
    metrics: Mock.Random.integer(1, 100), // 随机数值
    'timestamp|+1000': +Mock.Random.date('T')
  }))
}
// console.log(memoryData)

const data = Mock.mock({
  item: {
    memUsage: +Mock.Random.integer(200, 300),
    timestamp: +Mock.Random.date('T'),
    memTotle: 96
  }
})
console.log(data.item)
module.exports = [
  {
    url: '/epaas/server/data',
    type: 'get',
    response: config => {
      const items = data.item
      return {
        code: 20000,
        data: items
      }
    }
  }
]
