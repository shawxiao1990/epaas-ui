<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
const echarts = require('echarts')
import resize from './mixins/resize'
import { parseTime } from '@/utils'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    trafficMetric: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null,
      xAxisData: [],
      yAxisData: {},
      series: [],
      rgba: {},
      rgbas: [
        [
          'rgba(137, 189, 27, 0.3)',
          'rgba(137, 189, 27, 0)',
          'rgb(137,189,27)',
          'rgba(137,189,2,0.27)'

        ], [
          'rgba(0, 136, 212, 0.3)',
          'rgba(0, 136, 212, 0)',
          'rgb(0,136,212)',
          'rgba(0,136,212,0.2)'

        ]
      ],
      count: 0
    }
  },
  watch: {
    trafficMetric: {
      handler: function(val, oldVal) {
        if (val[0]) {
          this.xAxisData.push(parseTime(val[0].timestamp, '{h}:{i}:{s}'))
          Object.keys(val[0].value).forEach(element => {
            if (typeof (this.yAxisData[element]) !== 'object') {
              this.yAxisData[element] = [] // 初始化一个对象的key 的 value为数组
              this.rgba[element] = this.rgbas[this.count]
              this.count++
            }
            this.yAxisData[element].push(val[0].value[element])
            // console.log(element)
            // console.log(this.yAxisData[element])
          })
          this.setOption(this.xAxisData, this.yAxisData)
          if (this.xAxisData.length === 5) {
            this.xAxisData.shift()
            Object.keys(this.yAxisData).forEach(element => {
              this.yAxisData[element].shift()
            })
          }
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.rgba['loading'] = this.rgbas[this.count]
      this.setOption([0], { loading: 0 })
    },
    setOption(xAxisData, yAxisData) {
      if (this.series.length < Object.keys(yAxisData).length) {
        Object.keys(yAxisData).forEach(element => {
        // console.log(element)
        // console.log(yAxisData[element])
          const series = {
            name: element,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.rgba[element][0]
              }, {
                offset: 0.8,
                color: this.rgba[element][1]
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            },
            itemStyle: {
              color: this.rgba[element][2],
              borderColor: this.rgba[element][3],
              borderWidth: 12
            },
            data: yAxisData[element]
          }
          this.series.push(series)
        })
      }

      // console.log(this.series)
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: this.id,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: Object.keys(yAxisData),
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xAxisData
        }],
        yAxis: [{
          type: 'value',
          name: '(KB)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: this.series
      })
    }
  }
}
</script>
