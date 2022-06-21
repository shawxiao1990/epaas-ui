<template>
  <div style="padding:30px;">
    <router-view :key="key" />
    {{ key }}
  </div>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
