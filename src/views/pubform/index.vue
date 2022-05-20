<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="App Name" prop="appname">
        <el-input v-model="postForm.appname" />
      </el-form-item>
      <el-form-item label="Database Service">
        <el-checkbox-group v-model="postForm.db">
          <el-checkbox v-for="item in db" :key="item" :label="item" :value="item" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-form v-for="index of count" ref="postForm" :key="index" :model="postForm" :rules="rules" label-width="120px">
      <el-divider content-position="left"><span style="color: #409EFF">Module {{ index }}</span></el-divider>
      <el-form-item label="Module Name" prop="modulename">
        <el-input ref="modulename" v-model="postForm.modulename[index]" placeholder="please input your service name" />
      </el-form-item>
      <el-form-item label="Image Name" prop="imagename">
        <!-- <el-select v-model="postForm.imagename[index]" clearable filterable remote :remote-method="remoteMethod" placeholder="please select your image name" style="width:100%;"> -->
        <el-select v-model="postForm.imagename[index]" v-scroll-load-more="loadmore" clearable filterable default-first-option :filter-method="dataFilter" placeholder="please type your image name for search" style="width:100%;">
          <el-option v-for="item in loadedImageList" :key="item.id" :value="item.registry+'/'+item.repo+'/'+item.imagename+'/'+item.imagetag" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="postForm" label-width="120px">
      <el-form-item>
        <el-button @click="onIncrement">Add one module</el-button>
        <el-button @click="onDecrement">Delete this module</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import { getList } from '@/api/imagelist'
import scrollLoadMore from '@/directive/el-select/index'
export default {
  directives: { scrollLoadMore },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      pageData: {		// 懒加载相关参数，这里代表从第一条数据开始加载，一次加载二十项
        pageIndex: 1,
        pageSize: 5
      },
      postForm: {
        appname: '',
        modulename: [],
        imagename: [],
        db: []
      },
      db: ['mysql', 'redis'],
      count: 1,
      imagelist: null,
      filterImageText: null,
      listLoading: true,
      loadedImageList: [],
      rules: {
        appname: [{ required: true, trigger: 'blur', validator: validateRequire }],
        imagename: [{ required: true, trigger: 'blur', validator: validateRequire }],
        modulename: [{ required: true, trigger: 'blur', validator: validateRequire }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        setTimeout(() => {
          this.loadedImageList = this.imagelist.filter(item => {
            return item.imagename.toLowerCase()	// 这里同样是匹配选项的value
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.dataItems = []
      }
    },
    /** 下拉框懒加载 */
    loadmore() {
      this.pageData.pageIndex++
      this.getItems(this.pageData)	// 类似于分页查询
    },
    /** 一次加载5条 */
    getItems(value) {
      const num = ~~this.pageData.pageIndex * ~~this.pageData.pageSize
      this.loadedImageList = this.imagelist.filter((item, index, arr) => {
        return index < num
      })
    },
    /** 下拉框搜索 */
    dataFilter(val) {
      if (val) { // val存在
        this.loadedImageList = this.imagelist.filter((item) => {
          if (~item.imagename.indexOf(val)) {	// 这里匹配的是选项的imagename，也可以改成label
            return true
          }
        })
      } else { // val为空时，还原数组
        this.getItems(this.pageData)
      }
    },
    onSubmit() {
      this.$message('submit!')
      this.$refs.postForm[0].validate(valid => {
        if (valid) {
          this.$message('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.imagelist = response.data.items
        this.listLoading = false
      })
    },
    onIncrement() {
      this.count++
    },
    onDecrement() {
      this.count--
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

