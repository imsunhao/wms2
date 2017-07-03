<template>
    <el-row
      v-loading.body="true"
      style="width: 100%;height: 100vh"
      element-loading-text="拼命加载中"></el-row>
</template>

<script>
  export default {
    name: 'loadingComp',
    data () {
      return {
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
