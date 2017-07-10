<template>
  <div id="app">
    <transition name="fadeApp">
    <router-view class="appRouter"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="scss">
  /* 设置  全局 滚动条*/
  ::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.2rem;
  }
  
  ::-webkit-scrollbar-track {
  
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 0.2rem;
    background: rgba(0, 0, 0, 0.2);
  }
  
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.1);
  }
  
  ::-webkit-scrollbar-thumb:vertical:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  ::-webkit-scrollbar-thumb:vertical:active {
    background-color: rgba(0, 0, 0, 0.7);
  }

  html {
    overflow: hidden;
    height: 100vh;
  }
  
  body{
    margin: 0;
    padding: 0;
  }
  
  .login{
    .inner{
     .form {
       .el-form-item {
         width: 300px;
         margin: 0 auto;
         .el-form-item__error {
           top: 0;
           left: 100%;
           text-align: left;
           line-height: 20px;
           width:50px;
           height: 43px;
           display: block;
         }
       }
     }
    }
  }

  #app{
    position: relative;
    .appRouter{
      min-height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  
  .fadeApp-enter-active {
    transition: 1s;
  }

  .fadeApp-enter-to {
    animation: fadeApp-enter 1s forwards;
  }
  
  .fadeApp-leave-active {
    transition: 1s;
  }

  .fadeApp-leave-to {
    animation: fadeApp-leave .7s forwards;
  }
  
  @keyframes fadeApp-enter{
    0% {
      transform: scaleY(0) scaleX(0);
    }
    40% {
      transform: scaleY(0.1) scaleX(1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  }
  
  @keyframes fadeApp-leave{
    0% {
      transform: scaleY(1) scaleX(1);
    }
    60% {
      transform: scaleY(0.1) scaleX(1);
    }
    100% {
      transform: scaleY(0) scaleX(0);
    }
  }
  
</style>
