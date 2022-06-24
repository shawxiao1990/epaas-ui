<template>
  <div style="padding:30px;">
    <el-alert :closable="false" :title="endpoint" type="success">
      <!-- <div v-for="(item,index) in noteIps" :key="index">
        {{ item }}
      </div> -->
      <router-view :key="key" />
    </el-alert>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    return {
      endpoint: null,
      noteName: null,
      noteIps: []
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created() {
    const resourceRoutes = store.getters.routes
    this.endpoint = this.$route.path.split('/')[3]
    this.noteName = this.$route.path.split('/')[4]
    Object.keys(resourceRoutes[this.endpoint].serverList).forEach(servername => {
      this.noteIps.push(resourceRoutes[this.endpoint].serverList[servername])
    })
  }
}

</script>
