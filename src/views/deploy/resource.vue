<template>
  <div style="padding:30px;">
    <!-- <router-view :key="key" /> -->
    {{ noteIp }}
    <SSH :ip="noteIp" :height="10" :wight="10" />
  </div>
</template>
<script>
import store from '@/store'
export default {
  components: {
    SSH: () => import('@/components/SSH')
  },
  data() {
    return {
      endpoint: null,
      noteName: null,
      noteIp: null
    }
  },
  created() {
    const resourceRoutes = store.getters.routes
    this.endpoint = this.$route.path.split('/')[3]
    this.noteName = this.$route.path.split('/')[4]
    this.noteIp = resourceRoutes[this.endpoint].serverList[this.noteName]
  }
}

</script>
