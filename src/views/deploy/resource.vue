<template>
  <div style="padding:30px;">
    <router-view :key="key" />
    {{ noteIp }}
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    return {
      endpoint: null,
      noteName: null,
      noteIp: null
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created() {
    this.endpoint = this.$route.path.split('/')[3]
    this.noteName = this.$route.path.split('/')[4]
    const resourceRoutes = store.getters.routes
    this.noteIp = resourceRoutes[this.endpoint].serverList[this.noteName]
  }
}

</script>
