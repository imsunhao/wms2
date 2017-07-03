<template>
  <div id="app">
    <h1>Hello App!</h1>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/imsunhao' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/123' }">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/1241' }">活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">

</style>
