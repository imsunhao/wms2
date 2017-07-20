<template>
  <el-transfer v-model="value1" ref="el" @click.native="clickFun" :data="data"></el-transfer>
</template>

<script>
  export default {
    data () {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${i}`,
            disabled: i % 4 === 0,
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value1: [1, 4],
      };
    },
    methods: {
      clickFun () {
        console.log(111);
        setTimeout(() => {
          this.getDom().forEach(div => {
            div.classList[!div.querySelector('span.is-checked') ? 'remove' : 'add']('checked');
          });
        }, 100);
      },
      getDom () {
        return Array.from(this.$refs.el.$el.querySelectorAll('.el-transfer-panel__item'));
      },
    },
  };
</script>
<style lang="scss">
.checked{
  background: #f9f9f9;
  span{
    color:red;
  }
}
</style>
