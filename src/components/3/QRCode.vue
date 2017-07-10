<template>
  <div>
    <qrcode value="https://xkeshi.github.io/vue-qrcode/"></qrcode>
    <qrcode value="https://xkeshi.github.io/vue-qrcode/" :options="{ foreground: '#50a3a2',foregroundAlpha:'#00000',size:150 }"></qrcode>
    <qrcode value="https://xkeshi.github.io/vue-qrcode/" tag="img"></qrcode>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
