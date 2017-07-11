<template>
  <el-row
    v-else
    v-loading="loading"
    element-loading-text="拼命加载中">
    <error-comp v-if="error" :title="'asdgsd'"></error-comp>
    <h1>Hello App!
      <router-link to="/">wms</router-link>
    </h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/wms/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item to="/wms/pane">标签页</el-breadcrumb-item>
          <el-breadcrumb-item to="/wms/qrcode">活动列表</el-breadcrumb-item>
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
  import { speckText } from '../config/Tools';
  import { mapState } from 'vuex';
  
  const io = require('io');
  
  export default {
    name: 'wms',
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      speckText('乐速科技 WMS4.0 , 系统连接正常！');
      setTimeout(() => {
        console.log('页面加载完成!\n等待上一个页面动画完成中...');
        next();
      }, 1500);
    },
    data () {
      return {
        loading: false,
        error: false,
        ws: '',
      };
    },
    computed: {
      ...mapState(['http']),
    },
    mounted () {
      let userName = 'imsunhao';
      const socket = io.connect('http://' + this.http.ip + ':13000/');
      socket.on('connect', function () {
        console.log(userName);
        socket.emit('join', userName);
      });
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
  
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }
  
  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
