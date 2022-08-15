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
        appname: '',
        modulename: [],
        imagename: [],
        module_env: [],
        db: []
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
  },
  methods: {
    submitForm() {
      this.$refs.yamlForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.yamlJSONs.forEach(json => {
            Object.keys(json.services).forEach(service => {
              this.postForm.modulename.push(service)
              this.postForm.imagename.push(json.services[service].image)
              console.log(json.services[service].environment)
              const kv_map = {}
              // 对yaml文件中环境变量的书写格式进行判断是数组或者对象
              if (typeof json.services[service].environment.length === 'number') {
                json.services[service].environment.forEach(kv_string => {
                  // 字符串转数组，分割一次
                  const kv_array = kv_string.split('=', 2)
                  console.log('kv_array', kv_array)
                  // 转 kv 对象
                  kv_map[kv_array[0]] = kv_array[1]
                })
              } else {
                for (const k in json.services[service].environment) {
                  kv_map[k] = json.services[service].environment[k]
                }
              }
              this.postForm.module_env.push(JSON.stringify(kv_map))
              console.log(service, '  ', this.postForm.module_env)
            })
          })
          this.$store.dispatch('publishapp/PushData', this.postForm)
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
