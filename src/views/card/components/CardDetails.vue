<template>
  <el-dialog :visible.sync="visibleInner" @close="handleCancle">
    <el-form ref="dataForm" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
      <el-form-item label="app_id">
        {{ list.id }}
      </el-form-item>
      <el-form-item label="Title">
        {{ list.title }}
      </el-form-item>
      <div v-for="index in list.docker_images" :key="index">
        <el-form-item :label="'docker_images'+(index)">
          {{ list.docker_images[index-1] }}
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
  // data() {
  //   return {
  //     visibleInner: null
  //   }
  // },
  // created() {
  //   this.visibleInner = this.visible
  //   console.log(this.visible)
  // },
  computed: {
    visibleInner: {
      get() {
        return this.visible
      },
      set(val) {
      }
    }
  },
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
</style>
