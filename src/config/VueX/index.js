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
  },
  getters: {

  },
  mutations: {
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
