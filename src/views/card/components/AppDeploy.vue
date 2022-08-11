<template>
  <el-dialog :visible.sync="visibleInner" @close="handleCancle">
    <el-form ref="dataForm" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
      <el-form-item label="app_id">
        {{ list.id }}
      </el-form-item>
      <el-form-item label="Title">
        {{ list.title }}
      </el-form-item>
      <el-form-item label="server ip">
        <el-select v-model="serverip" class="filter-item" placeholder="Please select your server for deploy" style="width: 300px;">
          <el-option v-for="item in ip" :key="item" :value="item" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="deploy()">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store'
export default {
  name: 'App',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    list: {
      type: Object,
      required: true
    }
  },
  // data() {
  //   return {
  //     visibleInner: null
  //   }
  // },
  data() {
    return {
      ip: [],
      serverip: null,
      deploying: false
    }
  },
  // created() {
  //   this.visibleInner = this.visible
  //   console.log(this.visible)
  // },
  computed: {
    visibleInner: {
      get() {
        return this.visible
      },
      set(val) {
      }
    }
  },
  created() {
    this.getIP()
  },
  methods: {
    handleCancle() {
      const flag = false
      this.$emit('closeDetails', flag)
      this.visibleInner = false
    },
    getIP() {
      this.endpointObject = store.getters.routes
      Object.keys(this.endpointObject).forEach(endpoint => {
        Object.keys(this.endpointObject[endpoint].serverList).forEach(serverName => {
          this.ip.push(this.endpointObject[endpoint].serverList[serverName])
        })
      })
    },
    deploy() {
      this.deploying = true
      this.$emit('confirmDeploy', this.list.title, this.serverip)
      this.handleCancle()
    }
  }
}

</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 300px;
    margin-top: 25px;
    margin-left: 25px;
    height: 250px;
  }
</style>
