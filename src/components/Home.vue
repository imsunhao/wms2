<template>
  <el-row>
    <el-table :data="doneTodos">
      <el-table-column
        type="index"
        width="80"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        align="center"
        prop="text"></el-table-column>
      <el-table-column
        label="id"
        show-overflow-tooltip
        align="center"
        prop="id"></el-table-column>
      <el-table-column
        label="可用操作"
        align="center">
        <template scope="s">
          <el-popover
            placement="right"
            :title="s.row.text"
            width="200"
            trigger="click">
            <solt name="content">
              <el-button type="success" @click="a(0)">{{count}}</el-button>
              <el-button type="success" @click="a(1)">{{countPlusLocalState}}</el-button>
            </solt>
            <el-button slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Func from '../config/function/0_Home';
  
  export default {
    name: 'home',
    data () {
      return {
        localCount: 10,
      };
    },
    computed: {
      countPlusLocalState (state) {
        return state.count + this.localCount;
      },
      ...mapState(['count']),
      ...mapGetters(['doneTodos']),
    },
    methods: {
      a (number) {
        console.log(this);
        this[Func[number]]();
      },
      [Func[0]] () {
        this.$store.commit('increment', {
          type: Func[0],
          amount: 1,
        });
      },
      [Func[1]] () {
        this.$store.commit('increment', {
          type: Func[1],
          amount: this.localCount,
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
