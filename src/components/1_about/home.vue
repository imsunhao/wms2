<template>
  <el-row
    v-else
    v-loading="loading"
    element-loading-text="加载数据中">
    <error-comp v-if="error" :title="'asdgsd'"></error-comp>
    <el-popover
      ref="popover4"
      width="400"
      :visible-arrow="false"
      placement="right"
      trigger="click">
      <el-select
        class="imsunhao"
        name="testSelet1"
        multiple-limit.number="4"
        v-model="checkedCities1" multiple placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.prop"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
    </el-popover>
    <el-button v-popover:popover4></el-button>
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
            trigger="click">
            <slot name="content">
              <el-button type="success" @click="f(0)">{{count}}</el-button>
              <el-button type="success" @click="f(1)">{{countPlusLocalState}}</el-button>
            </slot>
            <el-button slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Mutations from '../../config/Mutations/M0_Home';
  
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
      f (number) {
        this[Mutations[number]].value();
      },
      p (number) {
        switch (number) {
        case 0:
          setTimeout(() => {
            this.loading = false;
            console.log('加载完成');
//            this.error = true;
          }, 3000);
          break;
        default:
          return false;
        }
      },
      [Mutations[0].name] () {
        this.$store.commit('increment', {
          type: Mutations[0].type,
          amount: 1,
        });
      },
      [Mutations[1].name] () {
        this.$store.commit('increment', {
          type: Mutations[1].type,
          amount: this.localCount,
        });
      },
    },
  };
</script>

<style lang="scss">
  .imsunhao{
    width: 100%;
  }
</style>
