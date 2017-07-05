<template>
  <el-row>
    <el-checkbox-group
      v-model="checkedCities1"
      :min="1"
      :max="4">
      <el-checkbox v-for="city in cities" :label="city" :key="city.prop">{{city.label}}</el-checkbox>
    </el-checkbox-group>
    <el-table :data="doneTodos" border>
      <el-table-column
        align="center"
        type="index"
        width="80"></el-table-column>
      <el-table-column
        v-for="value in checkedCities1"
        :label="value.label"
        :prop="value.prop"
        show-overflow-tooltip
        align="center"></el-table-column>
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

  const cityOptions = [
    {prop: 'id', label: '商品 ID'},
    {prop: 'name', label: '商品名称'},
    {prop: 'category', label: '商品分类'},
    {prop: 'desc', label: '商品描述'},
    {prop: 'shop', label: '所属店铺'},
    {prop: 'shopId', label: '店铺 ID'},
    {prop: 'address ', label: '店铺地址'},
  ];
  
  export default {
    name: 'home',
    data () {
      return {
        checkedCities1: [cityOptions[0], cityOptions[1]],
        cities: cityOptions,
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
