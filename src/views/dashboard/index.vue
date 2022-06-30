<template>
  <div class="dashboard-container">
    <el-select v-model="filterText" clearable filterable default-first-option placeholder="please type your IP for search" style="width:100%;" @change="handleFilter">
      <el-option v-for="item in IPlist" :key="item.id" :value="item" />
    </el-select>
    <div class="dashboard-text" style="border-bottom: 1px solid #ececec">STATUS</div>
    <el-row :gutter="40">
      <el-col v-for="(item,index) of mymetric" :key="index" :span="6" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <piechart :id="index" :metric-item="item" />
      </el-col>
    </el-row>
    <div class="line-chart-container">
      <lineChart id="traffic" height="100%" width="100%" :traffic-metric="trafficMetric" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import piechart from './piechart.vue'
import lineChart from './LineMarker'
import { fetchData, fetchDataTraffic } from '@/api/server-data'
import store from '@/store'

export default {
  name: 'Dashboard',
  components: {
    piechart,
    lineChart
  },
  data() {
    return {
      timer: null,
      dataLoading: false,
      metric: [],
      mymetric: [{}, {}],
      trafficMetric: [],
      filterText: '',
      IPlist: [],
      myRoles: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    metric: {
      handler: function(val, oldVal) {
        if (val) {
          this.mymetric = val
        }
      },
      immediate: false
    },
    trafficMetric(val) {
      if (val) {
        this.trafficMetric = val
      }
    }
  },
  created() {
    // this.getData()
    this.myRoles = store.getters.roles
    this.getIPList(this.myRoles)
    // this.timer = setInterval(() => {
    //   setTimeout(this.getData, 0)
    //   setTimeout(this.getDataTraffic, 0)
    // }, 10000)
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    resetMetric() {
      this.metric = [{}, {}]
      this.trafficMetric = []
    },
    handleFilter() {
      console.log(this.filterText)
      this.resetMetric()
      this.timer = setInterval(() => {
        setTimeout(this.getData, 0)
        setTimeout(this.getDataTraffic, 0)
      }, 10000)
    },
    getIPList(roles) {
      this.endpointObject = store.getters.routes
      Object.keys(this.endpointObject).forEach(endpoint => {
        Object.keys(this.endpointObject[endpoint].serverList).forEach(serverName => {
          var resourceObj = { servername: serverName, serverip: this.endpointObject[endpoint].serverList[serverName], endpoint: endpoint, roles: this.endpointObject[endpoint].roleList[serverName] }
          if (!roles.some(role => resourceObj.roles.includes(role))) {
            return
          }
          this.IPlist.push(resourceObj.serverip)
        })
      })
    },
    getData() {
      this.dataLoading = true
      return new Promise((resolve, reject) => {
        fetchData(this.filterText).then(response => {
          this.metric = response.data
          this.dataLoading = false
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },
    getDataTraffic() {
      this.dataLoading = true
      return new Promise((resolve, reject) => {
        fetchDataTraffic(this.filterText).then(response => {
          this.trafficMetric = response.data
          this.dataLoading = false
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pie-col {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);

}
.line-chart-container{
  position: relative;
  width: 50%;
  height: calc(100vh - 84px);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 5%);
}
</style>
