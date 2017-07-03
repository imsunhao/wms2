// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-default/index.css';

import App from './App.vue';

Vue.config.productionTip = true;

Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment (state) {
      state.count++;
    },
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
