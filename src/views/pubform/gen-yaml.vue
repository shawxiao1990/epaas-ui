<template>
  <div>
    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
      Comfirmed and Publish
    </el-button>
    <el-form ref="yamlForm" :model="yamlForm" class="form-container">
      <el-form-item prop="yamlData" :rules="rules.yamlData">
        <div class="editor-container">
          <yaml-editor v-model="yamlForm.yamlData" :rules="rules.yamlData" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import YamlEditor from '@/components/YamlEditor/index.vue'
import { createApp } from '@/api/applist'
const yaml = require('js-yaml')

export default {
  name: 'YamlEditorDemo',
  components: { YamlEditor },
  data() {
    const validateRequire = (rule, value, callback) => {
      try {
        this.yamlJSONs = yaml.loadAll(value)
        console.log('success')
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(new Error(rule.field + '为必传项'))
        } else {
          callback()
        }
      } catch (error) {
        console.log(error)
        this.$message({
          message: error.reason + ' 有格式问题，请检查',
          type: 'error'
        })
        callback(new Error(rule.field + ' 有格式问题，请检查'))
      }
    }
    return {
      postForm: {
        docker_images: []
      },
      yamlForm: {
        yamlData: ''
      },
      yamlJSONs: null,
      yamlFile: null,
      loading: false,
      index: 0,
      rules: {
        yamlData: [{ required: true, trigger: 'blur', validator: validateRequire }]
      }
    }
  },
  created() {
    // this.postForm = this.$store.getters.appForm
    this.yamlFile = this.$store.getters.yamlFile
    this.yamlForm.yamlData = this.yamlFile
    // var count = this.postForm.modulename.length
    // for (let i = 0; i < count; i++) {
    //   this.index = i
    //   var yamltemplate = '\n  ' + this.postForm.modulename[this.index] + ':' + '\n    container_name: ' + this.postForm.modulename[this.index] + '\n    image: ' + this.postForm.imagename[this.index]
    //   this.yamlForm.yamlData += yamltemplate
    // }
  },
  methods: {
    submitForm() {
      this.$refs.yamlForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.yamlJSONs.forEach(json => {
            Object.keys(json.services).forEach(service => {
              this.postForm.docker_images.push(json.services[service].image)
            })
          })
          this.$store.dispatch('publishapp/PushData', this.postForm)
          createApp(this.postForm).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
          this.postForm.status = 'published'
          this.loading = false
          // this.$router.push({ path: '/ApplicationMarket/applist' })
          this.$router.push({ path: '/ApplicationMarket/apppublish' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.editor-container{
  position: relative;
  height: 100%;
}
</style>
