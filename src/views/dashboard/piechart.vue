<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
// var echarts = require('echarts/lib/echarts')
const echarts = require('echarts')
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    metricItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
      item: 'loading',
      Usage: 0,
      Totle: 0,
      Perc: 0
    }
  },
  watch: {
    metricItem: {
      handler: function(val, oldVal) {
        if (Object.keys(val)[0] && this.chart) {
          this.item = Object.keys(val)[0]
          this.Usage = val[Object.keys(val)[0]].Usage
          this.Totle = val[Object.keys(val)[0]].Totle
          this.Perc = Math.round((this.Usage / this.Totle) * 100)
          this.setOptions(this.item, this.Perc)
        } else if (this.chart) {
          this.setOptions('loading', 0)
        }
      },
      immediate: true
    },
    trafficMetric: {
      handler: function(val, oldVal) {
        if (Object.keys(val)[0] && this.chart) {
          this.item = Object.keys(val)[0]
          this.Usage = val[Object.keys(val)[0]].Usage
          this.Totle = val[Object.keys(val)[0]].Totle
          this.Perc = Math.round((this.Usage / this.Totle) * 100)
          this.setOptions(this.item, this.Perc)
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
      this.setOptions(this.item, this.Perc)
    },
    setOptions(item, Perc) {
      this.chart.setOption({
        title: {
          text: item + '\n\n' + Perc + '%',
          left: 'center',
          top: 61.5,
          textStyle: {
            color: '#1890fe'
          }
        },
        legend: {
          itemGap: 10
        },
        visualMap: {
          show: false
        },
        series: [
          {
            type: 'pie',
            // 环形显示饼状图，实际上显示的是50-80之间的部分
            // 上限不建议设置为100，echarts自带动画效果，设置为100动画效果很丑
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            data: [
            // itemSyle是单项的背景颜色设置。
              { value: 100 - Perc, itemStyle: { color: '#f1f1f1' }},
              { value: Perc, itemStyle: { color: '#1890fe' }}
            ],
            label: {
            // 将视觉引导图关闭
              show: false
            },
            itemStyle: { // 设置的是每项之间的留白
              borderWidth: 7
            // borderColor: '#fff'
            },
            // 初始化echarts的动画效果
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            }
          }
        ] })
    }
  }
}
</script>
