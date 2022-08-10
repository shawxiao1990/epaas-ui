<template>
  <el-dialog :visible.sync="visibleInner" @close="handleCancle">
    <el-form ref="dataForm" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
      <el-form-item label="app_id">
        {{ list.id }}
      </el-form-item>
      <el-form-item label="Title">
        {{ list.title }}
      </el-form-item>
      <el-form-item label="Author">
        {{ list.author }}
      </el-form-item>
      <div v-for="(item,index) in list.docker_images" :key="index">
        <el-form-item :label="Object.keys(list.module_env)[index]">
          <el-input v-model="list.docker_images[index]" />
          <div v-for="env_key in Object.keys(list.module_env[Object.keys(list.module_env)[index]])" :key="env_key" class="box">
            <div class="column key">{{ env_key }} =</div>
            <el-input v-model="list.module_env[Object.keys(list.module_env)[index]][env_key]" type="textarea" class="column value" />
          </div>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'App',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    visibleInner: {
      get() {
        if (this.visible === true) {
          // console.log(this.list)
        }

        return this.visible
      },
      set(val) {
      }
    }
  },
  // data() {
  //   return {
  //     visibleInner: null
  //   }
  // },
  // mounted() {
  //   console.log(this.list)
  // },
  methods: {
    handleCancle() {
      const flag = false
      this.$emit('closeDetails', flag)
      this.visibleInner = false
    }
  }
}

</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 300px;
    margin-top: 25px;
    margin-left: 25px;
    height: 250px;
  }
  .box {
  display: flex;
  flex-wrap: wrap;

 }
 .column.key {
  flex: 0 0 20%;
 }
 .column.value {
  flex: 0 0 80%;
 }
</style>
