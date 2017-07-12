<template>
  <div>
    <qrcode :value="`http://${this.http.ip}:18080/#wms/user/1`"></qrcode>
    <qrcode :value="`http://${this.http.ip}:18080/#wms/user/2`" :options="{ foreground: '#50a3a2',foregroundAlpha:'#00000',size:150 }"></qrcode>
    <qrcode :value="`http://${this.http.ip}:18080/#wms/user/3`" tag="img"></qrcode>
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
      ...mapState(['http']),
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
