import Vue from 'vue';
Vue.config.productionTip = true;

import VueX from 'vuex';
Vue.use(VueX);
import VueXConfig from './config/VueX';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

import LoadingComp from '@/components/0_static/LoadingComp.vue';
import ErrorComp from '@/components/0_static/ErrorComp.vue';
import VueQrcode from 'vue-qrcode';
Vue.component('loading-comp', LoadingComp);
Vue.component('error-comp', ErrorComp);
Vue.component('qrcode', VueQrcode);

import App from './App.vue';
import router from './router';
const store = new VueX.Store(VueXConfig);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
});
