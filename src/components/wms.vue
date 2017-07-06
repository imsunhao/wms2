<template>
    <el-row
      v-else
      v-loading="loading"
      element-loading-text="拼命加载中">
      <error-comp v-if="error" :title="'asdgsd'"></error-comp>
      <h1>Hello App! <router-link to="/">wms</router-link></h1>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/wms/home">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/wms/pane">标签页</el-breadcrumb-item>
            <el-breadcrumb-item to="/wms/user/123">活动列表</el-breadcrumb-item>
            <el-breadcrumb-item to="/wms/user/1241">活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-card>
    </el-row>
</template>

<script>
  export default {
    name: 'wms',
    data () {
      return {
        loading: false,
        error: false,
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
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
</style>
