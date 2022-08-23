<template>
  <el-dialog id="addRoleDialog" v-dialogDrag :visible.sync="visibleInner" append-to-body @close="handleCancle">
    <div class="margin">
      <el-form>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="2">应用名称：</el-col>
          <el-col :span="10">{{ appname }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="2">服务器ip：</el-col>
          <el-col :span="5">{{ serverip }}</el-col>
        </el-row>
      </el-form>
    </div>
    <div style="height: 300px;" class="box margin">
      <el-steps direction="vertical" :active="activeStep" finish-status="success" align-center>
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
      </el-steps>
      <SSH :ip="serverip" :log="true" :height="5" :wight="5" class="item" @currentStep="currentStep" />
    </div>
  </el-dialog>
</template>

<script>
import dialogDrag from '@/directive/dialogDrag/index'

export default {
  directives: { dialogDrag },
  components: {
    SSH: () => import('@/components/SSH')
  },
  props: {
    serverip: {
      type: String,
      default: null
    },
    appname: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      activeStep: 0
    }
  },
  computed: {
    visibleInner: {
      get() {
        return this.visible
      },
      set(val) {
      }
    }
  },
  created() {

  },
  methods: {
    handleCancle() {
      const flag = false
      this.$emit('closeProgress', flag)
      this.visibleInner = false
    },
    currentStep(step) {
      this.activeStep = step
    }
  }
}
</script>

<style>
  .box{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .item{
    flex: 1;
    width: 25%;
    min-width: 50%;
    max-width: 50%;
  }
  .margin{
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 20px;
  }

.el-dialog {
    right: 0px;
}
</style>
