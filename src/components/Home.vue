<template>
    <el-row
      v-else
      v-loading="loading"
      element-loading-text="拼命加载中">
      <error-comp v-if="error" :title="'asdgsd'"></error-comp>
      <el-checkbox-group
        v-model="checkedCities1"
        :max="4">
        <el-checkbox
          v-for="city in cities"
          :label="city"
          :key="city.prop">{{city.label}}</el-checkbox>
      </el-checkbox-group>
      <el-select
        multiple-limit="4"
        v-model="checkedCities1" multiple placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.prop"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
      <el-table :data="doneTodos" border>
        <el-table-column
          align="center"
          type="index"
          width="80"></el-table-column>
        <el-table-column
          v-for="value in checkedCities1"
          :label="value.label"
          :min-width="value.minWidth||'120px'"
          :prop="value.prop"
          align="center"></el-table-column>
        <el-table-column
          label="可用操作"
          fixed="right"
          min-width="120px"
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
    {prop: 'id', label: '商品 ID', minWidth: '200px'},
    {prop: 'name', label: '商品名称', minWidth: '200px'},
    {prop: 'category', label: '商品分类', minWidth: '200px'},
    {prop: 'desc', label: '商品描述', minWidth: '250px'},
    {prop: 'shop', label: '所属店铺', minWidth: '200px'},
    {prop: 'shopId', label: '店铺 ID', minWidth: '200px'},
    {prop: 'address', label: '店铺地址', minWidth: '200px'},
  ];
  
  export default {
    name: 'home',
    data () {
      return {
        error: false,
        loading: true,
        checkedCities1: [cityOptions[0], cityOptions[1]],
        cities: cityOptions,
        localCount: 10,
      };
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.p(0);
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'p(1)',
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
      p (number) {
        switch (number) {
        case 0:
          setTimeout(() => {
            this.loading = false;
            this.error = true;
          }, 3000);
//          this.loading = false;
          console.log(111);
          break;
        default:
          return false;
        }
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
