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
              v-model="table.tableColumn" multiple placeholder="请选择">
              <el-option
                v-for="item in table.tableColumnAll"
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
        :data="table.data"
        :row-key="table.key"
        border>
        <el-table-column
          label="设置"
          fixed="left"
          width="80px"
          align="center">
          <template scope="s">
            {{s.$index}}
            <el-popover
              popper-class="demo-table-expand"
              placement="right"
              :title="s.row.text"
              trigger="click">
              <slot name="content">
                  <el-form labelWidth="80px" label-position="left">
                    <el-form-item label="商品名称">
                      <span>{{ s.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属店铺">
                      <span>{{ s.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="商品 ID">
                      <span>{{ s.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                      <span>{{ s.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                      <span>{{ s.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                      <span>{{ s.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                      <span>{{ s.row.desc }}</span>
                    </el-form-item>
                    <el-form-item label="可用操作">
                      <el-button type="success" size="small" @click="localCount++">{{localCount}}</el-button>
                      <el-button type="success" size="small" @click="localCount+=10">{{localCount}}</el-button>
                    </el-form-item>
                  </el-form>
              </slot>
              <button slot="reference" class="__table_index_button"></button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          v-if="table.multiSelect"
          type="selection"
          :reserve-selection="true"
          fixed="left"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="value in table.tableColumn"
          :key="value.prop"
          :label="value.label"
          :min-width="value.minWidth||'0px'"
          :align="value.align||'center'"
          :formatter="value.formatter"
          :class-name="value.className"
          :prop="value.prop">
        </el-table-column>
      </el-table>
    </div>
    <el-button @click="testHttp">下一页</el-button>
    <el-button @click="testHttp2">上一页</el-button>
  </el-row>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Mutations from '~/Mutations/M0_Home';
  import { MutationsMethods } from '~/Mutations';
  import { table } from '~/Table/T1_home';
  import { publicMethods } from 'Tools';
  
  export default {
    name: 'home',
    data () {
      return {
        table: table,
        error: false,
        loading: false,
        localCount: 10,
        i: 0,
      };
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
    },
    computed: {
      countPlusLocalState (state) {
        return state.count + this.localCount;
      },
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      testHttp () {
        // GET /someUrl
        this.$http
        .post('/wms4/home', {pageSize: 10, pageNow: ++this.i})
        .then(response => {
          // get body data
          console.log(response.body);
          this.table.data = response.body.data;
        }, response => {
          // error callback
          console.log(response);
        });
      },
      testHttp2 () {
        // GET /someUrl
        this.$http
        .post('/wms4/home', {pageSize: 10, pageNow: --this.i})
        .then(response => {
          // get body data
          console.log(response.body);
          this.table.data = response.body.data;
        }, response => {
          // error callback
          console.log(response);
        });
      },
      ...MutationsMethods(Mutations),
      ...publicMethods(),
    },
    mounted () {
      console.log('Vue had mounted!');
      this.testHttp();
    },
  };
</script>

<style lang="scss">
  .demo-table-expand {
    font-size: 0;
    background-color: #fbfdff;
    .el-form-item{
      margin-bottom:0;
    }
  }
</style>
