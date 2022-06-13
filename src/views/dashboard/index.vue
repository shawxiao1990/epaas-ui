<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="border-bottom: 1px solid #ececec">STATUS</div>
    <el-row :gutter="40">
      <el-col v-for="(item,index) of mymetric" :key="index" :span="6" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <piechart :id="index" :metric-item="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import piechart from './piechart.vue'
import { fetchData } from '@/api/serverdata'

export default {
  name: 'Dashboard',
  components: { piechart },
  data() {
    return {
      timer: null,
      dataLoading: false,
      metric: [],
      mymetric: [{}]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    metric(val) {
      if (val) {
        this.mymetric = val
      }
    }
  },
  created() {
    // this.getData()
    this.timer = setInterval(() => {
      setTimeout(this.getData, 0)
    }, 10000)
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    getData() {
      this.dataLoading = true
      return new Promise((resolve, reject) => {
        fetchData().then(response => {
          this.metric = response.data
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
</style>
