<template>
  <div id="app">
    <el-row :gutter="8">
      <el-col v-for="item in list" :key="item.id" :span="6" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <app-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AppCard from './components/AppCard.vue'
import { getList } from '@/api/applist'

export default {
  components: {
    AppCard
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style>

</style>
