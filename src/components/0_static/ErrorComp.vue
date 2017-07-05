<template>
  <el-alert
    :title="title||'网路故障'"
    type="error"
    :description="msg||message"
    show-icon>
  </el-alert>
</template>

<script>
  export default {
    name: 'error-comp',
    prop: {msg: '', title: ''},
    data () {
      return {
        message: '因为网路原因,加载数据出错!',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
