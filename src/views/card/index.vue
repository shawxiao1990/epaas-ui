<template>
  <div id="app">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <el-row :gutter="8">
      <el-col v-for="item in filterList" :key="item.id" :span="6" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <app-card :list="item" />
      </el-col>
    </el-row>
    <pagination v-show="listTotal>0" :total="listTotal" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import AppCard from './components/AppCard.vue'
import { getList } from '@/api/applist'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: {
    AppCard,
    Pagination
  },
  data() {
    return {
      list: null,
      listLoading: true,
      filterText: '',
      myName: '',
      listTotal: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id',
        author: ''
      }
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.listTotal = response.data.total
      })
    }
  }
}
</script>
<style>
.el-row {
    margin-bottom: 20px;
    display:flex;
    flex-wrap: wrap;
  }
</style>
