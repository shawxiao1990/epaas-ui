<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ list.title }}</span>
      <el-button style="float: right; padding: 3px 0" type="text">Deploy</el-button>
    </div>
    <div class="text item">author: {{ list.author }}</div>
    <div class="text item">description: {{ list.description }}</div>
    <div class="text item">display_time: {{ list.display_time }}</div>
    <el-button style="float: right; padding: 3px 0" type="text">Details</el-button>
  </el-card>
</template>

<script>

export default {
  name: 'App',
  props: {
    list: {
      type: Object,
      required: true
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
