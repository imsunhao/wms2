import LoadingConf from '../../config/Loading/title';
import * as user from './public/user';

let vueX = {
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
    ...user.state,
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
    openLoading (state, payload) {
      state.loading['s' + payload.amount] = true;
      state.loading['t'] = LoadingConf(payload.t);
    },
    ...user.mutations,
    // changeActivePage (state, payload) {
    //   state.activePage = payload.amount;
    // },
  },
  actions: {},
};

function Constructor (data) {
  data.forEach(item => {
    Object.assign(vueX.state, item.state);
    Object.assign(vueX.getters, item.getters);
    Object.assign(vueX.mutations, item.mutations);
    Object.assign(vueX.actions, item.actions);
  });
}

Constructor([user]);

export default vueX;
