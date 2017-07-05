<template>
  <div id="app">
    <h1>Hello App!</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/pane' }">标签页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/123' }">活动列表</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/1241' }">活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .slide-fade-leave-to{
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
