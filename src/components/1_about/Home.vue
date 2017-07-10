<template>
  <el-row
    v-else
    v-loading="loading"
    element-loading-text="加载数据中">
    <error-comp v-if="error" :title="'asdgsd'"></error-comp>
    <div class="__table">
      <el-popover
        popper-class="__table"
        ref="popover4"
        width="300"
        :visible-arrow="false"
        placement="right"
        trigger="click">
        <el-form
          label-width="70px"
          :model="table">
          <el-form-item label="自定列名">
            <el-select
              class="__tabel_column"
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
          </el-form-item>
          <el-form-item label="启用多选" prop="multiSelect">
            <el-switch
              v-model="table.multiSelect"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-form-item>
          <transition name="el-zoom-in-top">
            <el-form-item label="多选操作" prop="multiSelect" v-if="table.multiSelect">
              <el-row>
                <el-col :span="8">
                  <el-button size="small" type="warning">追加分拣方式</el-button>
                </el-col>
                <el-col :span="12" :offset="4">
                  <el-button size="small" type="danger">取消分配</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-button size="small" type="info">打印标签</el-button>
                </el-col>
                <el-col :span="12" :offset="4">
                  <el-button size="small" type="success">上架</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </transition>
        </el-form>
      </el-popover>
      <button
        class="__table_button"
        v-popover:popover4></button>
      <el-table
        :data="doneTodos"
        border
        align="center">
        <el-table-column
          label="#"
          fixed="left"
          width="80px"
          align="center">
          <template scope="s">
            {{s.$index}}
            <el-popover
              placement="right"
              :title="s.row.text"
              trigger="click">
              <slot name="content">
                <el-button type="success" @click="f(0)">{{count}}</el-button>
                <el-button type="success" @click="f(1)">{{countPlusLocalState}}</el-button>
              </slot>
              <button slot="reference" class="__table_index_button"></button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          v-if="table.multiSelect"
          type="selection"
          fixed="left"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="value in checkedCities1"
          :key="value.prop"
          :label="value.label"
          :min-width="value.minWidth||'0px'"
          :prop="value.prop"></el-table-column>
      </el-table>
    </div>
    <el-button @click="testHttp">testHttp</el-button>
  </el-row>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Mutations from '../../config/Mutations/M0_Home';
  import { MutationsMethods } from '../../config/Mutations';
  
  const cityOptions = [
    {prop: 'id', label: '商品 ID', minWidth: '0px'},
    {prop: 'name', label: '商品名称', minWidth: '0px'},
    {prop: 'category', label: '商品分类', minWidth: '0px'},
    {prop: 'desc', label: '商品描述', minWidth: '0px'},
    {prop: 'shop', label: '所属店铺', minWidth: '0px'},
    {prop: 'shopId', label: '店铺 ID', minWidth: '0px'},
    {prop: 'address', label: '店铺地址', minWidth: '0px'},
  ];
  
  export default {
    name: 'home',
    data () {
      return {
        table: {
          multiSelect: false,
        },
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
        this[Mutations[number].event_name]();
      },
      p (number) {
        switch (number) {
        case 0:
          setTimeout(() => {
            this.loading = false;
            console.log('加载完成');
//            this.error = true;
          }, 10);
          break;
        default:
          return false;
        }
      },
      testHttp () {
        // GET /someUrl
        this.$http
        .get('/wms4/12')
        .then(response => {
          // get body data
          console.log(response.body);
        }, response => {
          // error callback
          console.log(response);
        });
      },
      ...MutationsMethods(Mutations),
    },
    mounted () {
      console.log('Vue had mounted!');
//      this.$store.commit(commit, payload);
    },
  };
</script>

<style lang="scss">

</style>
