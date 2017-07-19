<template>
  <el-transfer
    :render-content="content"
    v-model="value1"
    :data="data"></el-transfer>
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
            _class: {
              clicked: false,
            },
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value1: [1, 4],
        content (h, option) {
          return h('div', {
            'class': option._class,
            on: {
              click () {
                option._class.clicked = !option._class.clicked;
                console.log(option._class.clicked);
              },
            },
          }, option.label);
        },
      };
    },
  };
</script>
<style lang="scss">
.clicked{
  position: absolute;
  background: rgba(0,0,0,0.5);
  width: calc(100% - 48px);
  left: 0;
  padding-left: 48px;
}
</style>
