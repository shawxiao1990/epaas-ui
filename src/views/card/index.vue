<template>
  <div id="app">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <el-row :gutter="8">
      <el-col v-for="item in filterList" :key="item.id" :span="6" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <app-card :list="item" />
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
      listLoading: true,
      filterText: ''
    }
  },
  computed: {
    filterList() {
      return (this.list || []).filter(value => {
        return value.title.match(this.filterText)
      })
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
