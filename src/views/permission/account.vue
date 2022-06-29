<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="NAME" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="NAME" prop="id" sortable="custom" align="center" width="200" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="introduction" min-wi dth="150px">
        <template slot-scope="{row}">
          <span>{{ row.introduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="roles" prop="roles" align="center" width="200">
        <template slot-scope="{row}">
          <div v-for="element in row.roles" :key="element">
            <span class="link-type" @click="handleUpdate(row)">
              <el-tag>
                {{ element }}
              </el-tag>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="NAME" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="introduction" prop="introduction">
          <el-input v-model="temp.introduction" />
        </el-form-item>
        <el-form-item label="Roles" prop="roles">
          <div v-for="index in temp.roles.length" :key="index">
            <el-tag v-model="temp.roles[index-1]" closable @close="handleDeleteRole(index-1)">
              {{ temp.roles[index-1] }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item>
          <el-select v-model="tmpRole" placeholder="选择一个角色" style="width:100%;">
            <el-option v-for="item in allRoles" :key="item.key" :value="item.name" />
          </el-select>
          <el-button @click="handleAddRole(tmpRole)">添加角色</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllInfo, createUser, updateUser } from '@/api/user.js'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import store from '@/store'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  // directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      token: null,
      pageList: [],
      endpointObject: null,
      total: 0,
      listLoading: true,
      myName: '',
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        roles: []
      },
      allRoles: [],
      tmpRole: null,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.myName = store.getters.name
    this.token = store.getters.token
    this.getList(this.token)
    this.allRoles = store.getters.allRoles
  },
  methods: {
    getList(token) {
      this.listLoading = true
      this.list = []
      const { name, page = 1, limit = 20, sort } = this.listQuery
      getAllInfo(token).then(response => {
        Object.keys(response.data).forEach(token => {
          this.list.push(response.data[token])
        })
        this.list = this.list.filter(item => {
          if (name && item.name.indexOf(name) < 0) return false
          return true
        })
        if (sort === '-id') {
          this.list = this.list.reverse()
        }
        this.pageList = this.list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        this.total = this.list.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList(this.token)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        introduction: undefined,
        roles: []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDeleteRole(index) {
      this.temp.roles.splice(index, 1)
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp.roles)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAddRole(role) {
      this.temp.roles.push(role)
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
