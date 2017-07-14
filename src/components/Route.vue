<template>
  <el-row class="login">
  </el-row>
</template>

<script>
  export default {
    name: 'route',
    beforeRouteEnter (to, from, next) {
      if (to.params.code) {
        next();
      } else {
        next('/login/0');
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
