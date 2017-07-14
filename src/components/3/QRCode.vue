<template>
  <div>
    <el-row>
      <el-col :span="4">
        <qrcode :value="`http://${this.http.ip}:18080/#/wms/user/213`"></qrcode>
      </el-col>
      <el-col :span="16">
        <p>测试 动态数据 1页面</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <qrcode :value="`http://${this.http.ip}:18080/#/wms/user/3`" tag="img"></qrcode>
      </el-col>
      <el-col :span="16">
        <p>测试 动态数据 2页面 与长按识别图中二维码功能（仅微信端）</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <qrcode tag="img" :value="`http://${this.http.ip}:18080/#/login/${this.user.code}`" :options="{ foreground: '#50a3a2',foregroundAlpha:'#00000',size:150 }" ></qrcode>
      </el-col>
      <el-col :span="16">
        <p>测试 扫描二维码 登录    猜想配合  移动端客户端 手机令牌</p>
      </el-col>
    </el-row>
  
  
    <!--<router-link :to="{ name: 'code', params: { code: 'asgxcvb!dsdg12sdaasdxx1' }}">code-imsunhao</router-link>-->
    
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
      };
    },
    computed: {
      ...mapState(['http', 'user']),
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
