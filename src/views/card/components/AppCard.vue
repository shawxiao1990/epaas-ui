<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ list.title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleDeploy(list.id)">Deploy</el-button>
      </div>
      <div class="text item">app_id: {{ list.id }}</div>
      <div class="text item">author: {{ list.author }}</div>
      <div class="text item">description: {{ list.description }}</div>
      <div class="text item">timestamp: {{ list.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
      <el-button style="float: right; padding: 3px 0" type="text" @click="handleDetails(list.id)">Details</el-button>
    </el-card>
    <card-details :visible="dialogFormVisible" :list="list" @closeDetails="closeDetails" />
    <app-deploy :visible="dialogDeployFormVisible" :list="list" @closeDetails="closeDeploy" @confirmDeploy="confirmDeploy" />
    <PROGRESS :visible="dialoProgressFormVisible" :serverip="serverip" :appname="appname" @closeProgress="closeProgress" />
  </div>
</template>

<script>
import CardDetails from './CardDetails.vue'
import AppDeploy from './AppDeploy.vue'
import PROGRESS from '@/views/deploy/progress'
import { parseTime } from '@/utils'

export default {
  name: 'App',
  components: { CardDetails, AppDeploy, PROGRESS },
  filters: {
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogDeployFormVisible: false,
      dialoProgressFormVisible: false,
      appname: null,
      serverip: null
    }
  },
  methods: {
    handleDetails(id) {
      this.dialogFormVisible = true
    },
    closeDetails(flag) {
      this.dialogFormVisible = false
    },
    handleDeploy(id) {
      this.dialogDeployFormVisible = true
    },
    closeDeploy(flag) {
      this.dialogDeployFormVisible = false
    },
    handleProgress(id) {
      this.dialoProgressFormVisible = true
    },
    closeProgress(flag) {
      this.dialoProgressFormVisible = false
    },
    confirmDeploy(appname, serverip) {
      this.appname = appname
      this.serverip = serverip
      this.dialoProgressFormVisible = true
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
    height: 100%;
    transition: all .5s;
  }
</style>
