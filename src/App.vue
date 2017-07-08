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
  }
  
  body{
    margin: 0;
    padding: 0;
  }
</style>
