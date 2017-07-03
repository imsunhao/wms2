<template>
  <el-row>
    <el-button type="success" @click="click2">{{count}}</el-button>
    <el-button type="success" @click="click2">{{countPlusLocalState}}</el-button>
  </el-row>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'home',
    data () {
      return {
        localCount: 10,
      };
    },
    computed: mapState({
      count: 'count',
      countPlusLocalState (state) {
        return state.count + this.localCount;
      },
    }),
    methods: {
      click2 () {
        this.$store.commit('increment');
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
