import LoadingConf from '../../config/Loading/title';
import * as user from './public/user';
import * as http from './public/http';

let vueX = {
  state: {
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
        time: 'Sat Jul 15 2017 14:45:00 GMT+0800 (中国标准时间)',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987123',
        name: '啦啦啦',
        time: 'Sat Jul 15 2017 12:45:00 GMT+0800 (中国标准时间)',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987125',
        name: '嘎嘎',
        time: 'Sat Jul 15 2017 11:45:00 GMT+0800 (中国标准时间)',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987126',
        name: '吱吱',
        time: 'Sat Jul 15 2017 10:45:00 GMT+0800 (中国标准时间)',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      },
    ],
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
    openLoading (state, payload) {
      state.loading['s' + payload.amount] = true;
      state.loading['t'] = LoadingConf(payload.t);
    },
    // changeActivePage (state, payload) {
    //   state.activePage = payload.amount;
    // },
  },
  actions: {},
};

[
  user,
  http,
].forEach(item => {
  Object.assign(vueX.state, item.state);
  Object.assign(vueX.getters, item.getters);
  Object.assign(vueX.mutations, item.mutations);
  Object.assign(vueX.actions, item.actions);
});

export default vueX;
