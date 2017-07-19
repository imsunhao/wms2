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
  
  body {
    margin: 0;
    padding: 0;
  }
  
  @media screen and (max-width: 800px) {
    html {
      overflow-x: hidden;
      overflow-y: scroll;
      height: auto;
    }
    
    .box-card {
      .el-card__body {
        padding: 0;
      }
    }
    
  }
  
  .login {
    .inner {
      .form {
        .el-form-item {
          width: 300px;
          margin: 0 auto;
          .el-form-item__error {
            top: 0;
            left: 100%;
            text-align: left;
            line-height: 20px;
            width: 50px;
            height: 43px;
            display: block;
          }
        }
      }
    }
  }
  
  #app {
    position: relative;
    .appRouter {
      min-height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  
  .fadeApp-enter-active {
    opacity: 0;
    transition: 1s;
  }
  
  .fadeApp-enter-to {
    opacity: 1;
    animation: fadeApp-enter 1s forwards;
  }
  
  .fadeApp-leave-active {
    opacity: 1;
    transition: 1s;
  }
  
  .fadeApp-leave-to {
    opacity: 0;
    animation: fadeApp-leave .7s forwards;
  }
  
  @keyframes fadeApp-enter {
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
  
  @keyframes fadeApp-leave {
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
  
  .__table {
    position: relative;
    .el-form-item {
      margin-right: 0 !important;
      .el-form-item__content {
        width: calc(100% - 70px);
      }
    }
    .__table_button {
      position: absolute;
      z-index: 4;
      width: 80px;
      height: 40px;
      border: none;
      outline: none;
      background: rgba(0, 0, 0, 0);
    }
    .__table_index_button {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
      border: none;
      background: rgba(0, 0, 0, 0);
      outline: none;
    }
  }
  
  .loginLoading{
    background: rgba(255,255,255,.5);
    .el-loading-spinner .path{
      stroke:#13ce66
    }
    .el-loading-text{
      color: #13ce66;
    }
  }

</style>
