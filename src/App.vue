<template>
  <div id="app">
    <!--<transition>-->
    <router-view></router-view>
    <!--</transition>-->
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
    font-size:62.5%; /* 10÷16=62.5% */
  }
  
  body{
    margin: 0;
    padding: 0;
    font-size:1.2rem ; /* 12÷10=1.2 */
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
</style>
