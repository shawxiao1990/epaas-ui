<template>
  <div id="app">
    <div style="height: 300px;" class="box">
      <el-steps direction="vertical" :active="1" finish-status="success" align-center>
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
      </el-steps>
      <SSH :ip="noteIp" :height="5" :wight="5" class="item" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SSH: () => import('@/components/SSH')
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
</style>
