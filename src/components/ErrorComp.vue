<template>
  <el-alert
    title="错误提示"
    type="error"
    :description="message"
    show-icon>
  </el-alert>
</template>

<script>
  export default {
    name: 'errorComp',
    data () {
      return {
        message: '加载出错!',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
