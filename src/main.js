// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import ElementUI from 'element-ui';
import VueQrcode from 'vue-qrcode';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';

import LoadingComp from '@/components/0_static/LoadingComp.vue';
import LoadingConf from './config/Loading/title';
import ErrorComp from '@/components/0_static/ErrorComp.vue';

Vue.config.productionTip = true;

Vue.use(Vuex);
Vue.use(ElementUI);

Vue.component('loading-comp', LoadingComp);
Vue.component('error-comp', ErrorComp);
Vue.component('qrcode', VueQrcode);

const store = new Vuex.Store({
  state: {
    // activePage: {},
    count: 0,
    loading: {
      s0: false,
      s1: false,
      s2: false,
      s3: false,
      t: '',
    },
    todos: [
      {
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      },
    ],
    http: {
      ip: '',
      port: 0,
    },
    user: {
      username: '',
      password: '',
    },
  },
  getters: {
    doneTodos: state => {
      return state.todos;
    },
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount;
    },
    updateHttp (state, payload) {
      state.http = payload.amount;
    },
    updateUser (state, payload) {
      state.user = payload.amount;
    },
    openLoading (state, payload) {
      state.loading['s' + payload.amount] = true;
      state.loading['t'] = LoadingConf(payload.t);
    },
    // changeActivePage (state, payload) {
    //   state.activePage = payload.amount;
    // },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
});
