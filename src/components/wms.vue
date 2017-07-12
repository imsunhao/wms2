<template>
  <el-row
    v-else
    v-loading="loading"
    element-loading-text="拼命加载中">
    <error-comp v-if="error" :title="'asdgsd'"></error-comp>
    <h1>Hello App!
      <button @click="signOut">退出系统</button>
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
  import App from '../main';
  
  const io = require('io');
  let socket = '';
  
  export default {
    name: 'wms',
    beforeRouteEnter (to, from, next) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (App.user.nickname === '') {
          App.$http.post('/wms4/users/Login')
          .then(response => {
            if (response.body.status < 10000) {
              App.f(0, response.body.data);
              speckText(`欢迎回来! ${App.user.role}-${App.user.nickname}!`);
              next();
            } else {
              next({path: '/'});
            }
          });
        } else {
          speckText(`欢迎 ${App.user.role}-${App.user.nickname}!`);
          if (socket === '') {
            socket = io.connect('http://' + App.http.ip + ':13000/');
            let nickname = App.user.nickname;
            socket.on('connect', function () {
              console.log(nickname);
              socket.emit('join', nickname);
            });
          }
          setTimeout(() => {
            console.log('页面加载完成!\n等待上一个页面动画完成中...');
            next();
          }, 1500);
        }
      } else {
        next();
      }
    },
    data () {
      return {
        loading: false,
        error: false,
        ws: '',
      };
    },
    methods: {
      signOut () {
        this.$http.post('/wms4/users/logout')
        .then(response => {
          if (response.body.status < 10000) {
            this.$router.replace({path: '/'});
          }
        });
      },
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
