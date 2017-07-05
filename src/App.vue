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
  /* 设置 router-view 动画特效*/
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter{
    transform: translateX(10px);
    opacity: 0;
  }
  .slide-fade-leave-to{
    transform: translateX(-10px);
    opacity: 0;
  }
  /* 设置  全局 滚动条*/
  ::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.2rem;
  }
  ::-webkit-scrollbar-track {
  
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.2rem;
    background: rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb:vertical:hover{
    background-color: rgba(0,0,0,0.3);
  }
  ::-webkit-scrollbar-thumb:vertical:active{
    background-color: rgba(0,0,0,0.7);
  }
  
</style>
