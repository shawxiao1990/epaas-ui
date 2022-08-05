<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.serverip" placeholder="IP" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="IP" prop="id" sortable="custom" align="center" width="200" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.serverip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HOST NAME" min-wi dth="150px">
        <template slot-scope="{row}">
          <span>{{ row.servername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Permission" prop="roles" align="center" width="200">
        <template slot-scope="{row}">
          <div v-for="element in row.roles" :key="element">
            <span>
              <el-tag>
                {{ element }}
              </el-tag>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Endpoint" prop="endpoint" align="center" width="200">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleEndpoint(row)">
            <el-tag>
              {{ row.endpoint }}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="SSH login" align="center" class-name="status-col" width="200">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleSSH(row)">
            <el-tag>
              >_
            </el-tag>
          </span>
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
        <el-form-item label="IP" prop="serverip">
          <el-input v-model="temp.serverip" />
        </el-form-item>
        <el-form-item label="HOST NAME" prop="servername">
          <el-input v-model="temp.servername" />
        </el-form-item>
        <el-form-item label="SSH user" prop="username">
          <el-input v-model="temp.ssh_user" />
        </el-form-item>
        <el-form-item label="SSH password" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="Endpoint" prop="endpoint">
          <el-input v-model="temp.endpoint" />
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
import { createServer, updateServer } from '@/api/server-endpoint'
// import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import store from '@/store'
import crypto from '@/utils/crypto'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  // directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      pageList: [],
      endpointObject: null,
      total: 0,
      listLoading: true,
      myName: '',
      allRoles: [],
      myRoles: [],
      tmpRole: null,
      listQuery: {
        page: 1,
        limit: 20,
        serverip: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        roles: []
      },
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
    this.myRoles = store.getters.roles
    this.getList()
    this.allRoles = store.getters.allRoles
  },
  methods: {
    getList() {
      this.listLoading = true
      this.list = []
      this.endpointObject = store.getters.routes
      const { serverip, page = 1, limit = 20, sort } = this.listQuery
      Object.keys(this.endpointObject).forEach(endpoint => {
        Object.keys(this.endpointObject[endpoint].serverList).forEach(serverName => {
          var resourceObj = { servername: serverName, serverip: this.endpointObject[endpoint].serverList[serverName], endpoint: endpoint, roles: this.endpointObject[endpoint].roleList[serverName] }
          this.list.push(resourceObj)
        })
      })
      this.list = this.list.filter(item => {
        if (serverip && item.serverip.indexOf(serverip) < 0) return false
        const hasPermission = item.roles.some(role => {
          return this.myRoles.includes(role)
        })
        return hasPermission
      })
      if (sort === '-id') {
        this.list = this.list.reverse()
      }
      this.pageList = this.list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      this.total = this.list.length
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
        servername: undefined,
        serverip: undefined,
        endpoint: undefined,
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
          this.temp.password = crypto.encrypt(this.temp.password)
          createServer(this.temp).then(() => {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleSSH(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.$router.push({ path: '/DeployManage/Resource/' + this.temp.endpoint + '/' + this.temp.servername })
    },
    handleEndpoint(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.$router.push({ path: '/DeployManage/Resource/' + this.temp.endpoint })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateServer(tempData).then(() => {
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
    },
    handleAddRole(role) {
      this.temp.roles.push(role)
    },
    handleDeleteRole(role) {
      this.temp.roles.push(role)
    }
  }
}
</script>
